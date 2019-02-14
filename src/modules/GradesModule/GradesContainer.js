import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import GradesSearchbox from "./components/GradesSearchbox";
import GradesTable from "./components/GradesTable";
import GradesForm from "./components/GradesForm";
import SemestersService from "../../services/SemestersService";
import SubjectsService from "../../services/SubjectsService";
import SchoolClassesService from "../../services/SchoolClassesService";
import GradesService from "../../services/GradesService";
import StudentsService from "../../services/StudentsService";
import {NotificationManager} from "react-notifications";

export default class GradesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            schoolClasses: [],
            semesters: [],
            data: [],
            students:[],
            parameters: null, // ids of class, subject and semester
            studentForGrade:null
        };
    }

    componentDidMount() {
        this.getClasses()
        this.getSubjects()
        this.getSemesters()
    }

    getClasses() {
        SchoolClassesService.getAllSchoolClasses().then((response) => {
            if (response.status < 300) {
                this.setState({
                    schoolClasses: response.data,
                })
            }
        })
    }

    getSubjects() {
        SubjectsService.getAllSubjects().then((response) => {
            if (response.status < 300) {
                this.setState({
                    subjects: response.data,
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

    onClickSearch(parameters) {
        this.setState({parameters: parameters, data:[]})
        let url = '?idSu=' + parameters.idSu + '&idSe=' + parameters.idSe + '&idCl=' + parameters.idCl

        GradesService.getAllStudentsAndGradesForSemesterClassAndSubject(url).then((res) => {
            if (res.status < 300) {
                    StudentsService.getStudentsInClass(parameters.idCl).then((response) => {
                        if (response.status < 300) {
                            this.setState({
                                data: Array.from(response.data,item=>{

                                    let grades = []
                                    if(res.data.find(grade=>grade.idSt === item.idSt)){
                                        grades = (res.data.find(grade=>grade.idSt === item.idSt)).grades
                                    }

                                    return{
                                        ...item,
                                        grades: grades
                                    }
                                }),
                            })


                        }
                    })
            }
        })


    }

    onClickAddGrade(obj){
        this.setState({
            showForm:true,
            studentForGrade:obj
        })
    }

    onClickSaveGrade(obj){
        GradesService.addGrade(obj).then((response) => {
            if (response.status < 300) {
                NotificationManager.success('Successfully added')
                this.onClickSearch(this.state.parameters)
            }
        })
        this.setState({showForm:false,studentForGrade:null})
    }

    render() {

        return (
            <NavigationComponent>
                <div>
                    <Row>
                        <Col xs={12}>
                            <GradesSearchbox subjects={this.state.subjects}
                                             schoolClasses={this.state.schoolClasses}
                                             semesters={this.state.semesters}
                                             handleClickSearch={(parameters) => {
                                                 this.onClickSearch(parameters)
                                             }}
                            />
                        </Col>
                        {
                            this.state.data.length > 0 ?
                                <Col xs={12}>
                                    {
                                        (this.state.showForm && Boolean(this.state.studentForGrade))?
                                            <GradesForm
                                                student={this.state.studentForGrade}
                                                subject={this.state.subjects.find(s=>s.idSu === this.state.parameters.idSu)}
                                                schoolClass={this.state.schoolClasses.find(s=>s.idCl === this.state.parameters.idCl)}
                                                semester={this.state.semesters.find(s=>s.idSe === this.state.parameters.idSe)}
                                                handleClickCancel={()=>{this.setState({showForm:false,studentForGrade:null})}}
                                                handleClickSave={(obj)=>{this.onClickSaveGrade(obj)}}

                                            />
                                            :
                                            ''
                                    }

                                    <GradesTable data={this.state.data}
                                                 semester={this.state.semesters.find(s=>s.idSe === this.state.parameters.idSe)}
                                                 handleClickAddGrade={(obj)=>this.onClickAddGrade(obj)}

                                    />
                                </Col>
                                :
                                ''
                        }
                    </Row>
                </div>
            </NavigationComponent>
        );
    }
}

