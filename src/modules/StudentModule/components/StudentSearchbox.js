import React, {Component} from 'react';
import {Col, Form, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonAction} from "../../../app_components/ButtonsComponents";
import {Icon} from "../../../app_components/IconComponent";

export default class StudentSearchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: null,
            schoolClass: null,
            students:[],
            student:null,
        };
    }

    componentDidMount() {
        if (!this.state.semester)
            this.setState({
                semester: this.props.semesters.find(s => Boolean(s.isCurrent))
            })
    }

    componentWillReceiveProps(nextprops) {
        if (!this.state.semester)
            this.setState({
                semester: nextprops.semesters.find(s => Boolean(s.isCurrent))
            })
    }

    onChangeClass(e){
        this.setState({schoolClass:e, students:[], student:null})
        this.getStudentsFromClass(e)
    }

    getStudentsFromClass(schoolClass){
        let arr = [
            {
                idSt: 1,
                firstname: 'Adam',
                surname: 'Smith',
                personalNumber: '1212121212',
                adress: 'Rzeszow, Poland',
                notes: '',
                idCl: 1,
            },
            {
                idSt: 2,
                firstname: 'Margaret',
                surname: 'Smith',
                personalNumber: '1333333333',
                adress: 'Rzeszow, Poland',
                notes: 'has hearing problems',
                idCl: 1
            },
        ]
        this.setState({students:arr})
    }

    onClickSearch(){
        if(Boolean(this.state.student) && Boolean(this.state.semester)){
            this.props.handleClickSearch({
                idSt:this.state.student.idSt,
                idSe:this.state.semester.idSe,
            })
        }else{
            alert('Please choose student')
        }
    }
    
    renderSchoolClass(option) {
        return (
            <div>
                <span className={'badge badge-secondary'}>{option.name}</span> - {option.profile + ', ' + option.startYear}
            </div>
        )
    }

    renderStudent(option){
        return option.firstname+' '+option.surname
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

    render() {

        return (
            <div>
                <Form>
                    <h6>Search particular student's grades based on class and semester</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Semester<Req/></Label>
                            <Select options={this.props.semesters}
                                    value={this.state.semester}
                                    formatValueLabel={this.renderSemester}
                                    formatOptionLabel={this.renderSemester}
                                    onChange={(e) => {
                                        this.setState({semester: e})
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={3}>
                            <Label>Class<Req/></Label>
                            <Select options={this.props.schoolClasses}
                                    value={this.state.schoolClass}
                                    formatValueLabel={this.renderSchoolClass}
                                    formatOptionLabel={this.renderSchoolClass}
                                    onChange={(e) => {
                                        this.onChangeClass(e)
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={3}>
                            <Label>Student<Req/></Label>
                            <Select options={this.state.students}
                                    value={this.state.student}
                                    formatValueLabel={this.renderStudent}
                                    formatOptionLabel={this.renderStudent}
                                    onChange={(e) => {
                                        this.setState({student: e})
                                    }}
                                    clearable={false}
                                    disabled={!Boolean(this.state.schoolClass)}
                            />
                        </Col>
                        <Col xs={3}>
                            <LabelMargin/>
                            <ButtonAction onClick={() => {
                                this.onClickSearch()
                            }} label={'Search grades'}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

