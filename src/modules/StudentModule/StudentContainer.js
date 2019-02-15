import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import StudentSearchbox from "./components/StudentSearchbox";
import StudentGradesTable from "./components/StudentGradesTable";
import SchoolClassesService from "../../services/SchoolClassesService";
import SemestersService from "../../services/SemestersService";
import GradesService from "../../services/GradesService";
import SubjectsService from "../../services/SubjectsService";

export default class StudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolClasses: [],
            semesters: [],
            data: [],
            parameters: null,
        };
    }

    componentDidMount(){
        this.getSchoolClasses()
        this.getSemesters()
    }

    getSchoolClasses(){
        SchoolClassesService.getAllSchoolClasses().then((response) => {
            if (response.status < 300) {
                this.setState({
                    schoolClasses: response.data,
                })
            }
        })
    }

    getSemesters() {
        SemestersService.getAllSemesters().then((response) => {
            if (response.status < 300) {
                this.setState({
                    semesters: response.data,
                })
            }
        })
    }

    onClickSearch(parameters){

        this.setState({parameters:parameters})

        let url = '?idSt=' + parameters.idSt + '&idSe=' + parameters.idSe

        SubjectsService.getAllSubjects().then(response=>{
            if(response.status<300){
                GradesService.getAllStudentGradesForSemester(url).then((res) => {
                    if (res.status < 300) {
                        this.setState({
                            data:Array.from(response.data,item=>{

                                let grades = []
                                if(res.data.find(grade=>grade.idSu === item.idSu)){
                                    grades = (res.data.find(grade=>grade.idSu === item.idSu)).grades
                                }

                                return{
                                    ...item,
                                    grades:grades
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
                <NavigationComponent currentLink={this.props.match.path} history={this.props.history}>
                    <div>
                        <Row>
                            <Col xs={12}>
                                <StudentSearchbox schoolClasses={this.state.schoolClasses} semesters={this.state.semesters}
                                                  handleClickSearch={(obj)=>this.onClickSearch(obj)}/>
                            </Col>
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
                </NavigationComponent>
    );
    }
}

