import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {Icon} from "../../../app_components/IconComponent";
import Select from 'react-select'
import GradesService from "../../../services/GradesService";
import SubjectsService from "../../../services/SubjectsService";
import StudentGradesTable from "../../StudentModule/components/StudentGradesTable";

export default class StudentHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: null,
            data: []
        };
        this.loadDataAfterSetSemester=this.loadDataAfterSetSemester.bind(this)
        this.onClickSearch=this.onClickSearch.bind(this)
    }

    componentDidMount() {
        if (!this.state.semester) {
            let semester = this.props.semesters.find(s => Boolean(s.isCurrent))
            this.setState({
                semester: semester
            })
            this.loadDataAfterSetSemester(semester)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (!this.state.semester) {
            let semester = nextprops.semesters.find(s => Boolean(s.isCurrent))
            this.setState({
                semester: semester
            })
            this.loadDataAfterSetSemester(semester)
        }
    }

    loadDataAfterSetSemester(semester){
        if(Boolean(semester)){
            setTimeout(()=>{
                this.onClickSearch(semester)
            },1000)
        }
    }

    renderSemester(option) {
        return (<div>
            <span className={'badge badge-secondary'}>{option.name}</span> {option.dateSince + ' - ' + option.dateTo}
            <div className={'pull-right'}>
                {
                    option.isCurrent ?
                        <Icon type={'check'} style={{color: 'forestgreen'}}/>
                        :
                        <Icon type={'times'} style={{color: 'grey'}}/>
                }
            </div>
        </div>)
    }

    onChangeSemester(e) {
        this.setState({semester: e})
        this.onClickSearch(e)

    }

    onClickSearch(semester) {

        let url = '?idSt=' + this.props.user.typId + '&idSe=' + semester.idSe

        SubjectsService.getAllSubjects().then(response => {
            if (response.status < 300) {
                GradesService.getAllStudentGradesForSemester(url).then((res) => {
                    if (res.status < 300) {
                        this.setState({
                            data: Array.from(response.data, item => {

                                let grades = []
                                if (res.data.find(grade => grade.idSu === item.idSu)) {
                                    grades = (res.data.find(grade => grade.idSu === item.idSu)).grades
                                }

                                return {
                                    ...item,
                                    grades: grades
                                }
                            })
                        })
                    }
                })
            }
        })


    }

    render() {

        return (
            <div>
                <h4>
                    Hello, {this.props.user.login}!
                </h4>
                <div>
                    <Row>
                        <Col lg={3}>
                            <Select options={this.props.semesters}
                                    value={this.state.semester}
                                    formatValueLabel={this.renderSemester}
                                    formatOptionLabel={this.renderSemester}
                                    onChange={(e) => {
                                        this.onChangeSemester(e)
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col lg={7}><i style={{color: 'grey'}}>Below there are your grades. To see grades from others semesters, please select
                            semester</i></Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.data.length>0?
                                    <StudentGradesTable data={this.state.data}/>
                                    :
                                    ''
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

