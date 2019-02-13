import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import GradesSearchbox from "./components/GradesSearchbox";
import GradesTable from "./components/GradesTable";
import GradesForm from "./components/GradesForm";

export default class GradesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            schoolClasses: [],
            semesters: [],
            data: [],
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
        let arr = [
            {
                idCl: 1,
                name: '1A',
                profile: 'Math and IT',
                startYear: 2018,

            },
            {
                idCl: 2,
                name: '1B',
                profile: 'Biology and Chemistry',
                startYear: 2018,

            }
        ]
        this.setState({schoolClasses: arr})
    }

    getSubjects() {
        let arr = [
            {
                idSu: 1,
                name: 'IT',
            },
            {
                idSu: 2,
                name: 'Math',
            },
            {
                idSu: 3,
                name: 'English',
            },
            {
                idSu: 4,
                name: 'History',
            },
            {
                idSu: 5,
                name: 'Biology',
            },
            {
                idSu: 6,
                name: 'Chemistry',
            },
        ]
        this.setState({subjects: arr})
    }

    getSemesters() {
        let arr = [
            {
                idSe: 1,
                dateSince: '2018-09-01',
                dateTo: '2019-02-28',
                name: '2018/2019 winter',
                isCurrent:true,
            },
            {
                idSe: 2,
                dateSince: '2018-03-01',
                dateTo: '2019-06-30',
                name: '2018/2019 summer',
                isCurrent:false,
            }
        ]
        this.setState({semesters: arr})
    }

    onClickSearch(parameters) {
        this.setState({parameters: parameters})
        let url = '?idSu=' + parameters.idSu + '&idSe=' + parameters.idSe + '&idCl=' + parameters.idCl

        let arr = [
            {
                idSt: 1,
                firstname: 'Adam',
                surname: 'Smith',
                personalNumber: '1212121212',
                adress: 'Rzeszow, Poland',
                notes: '',
                idCl: 1,
                idSu: 1,
                grades: [
                    {
                        idGr:1,
                        idSe: 1,
                        date: '2018-10-10',
                        grade: 4.5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                    {
                        idGr:2,
                        idSe: 1,
                        date: '2019-01-23',
                        grade: 5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                ]
            },
            {
                idSt: 2,
                firstname: 'Margaret',
                surname: 'Smith',
                personalNumber: '1333333333',
                adress: 'Rzeszow, Poland',
                notes: 'has hearing problems',
                idCl: 1,
                idSu: 1,
                grades: [
                    {
                        idGr:3,
                        idSe: 1,
                        date: '2018-10-11',
                        grade: 3,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                    {
                        idGr:4,
                        idSe: 1,
                        date: '2019-02-01',
                        grade: 1,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                    {
                        idGr:5,
                        idSe: 1,
                        date: '2019-02-13',
                        grade: 4.5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                ]
            }
        ]


        this.setState({data: arr})

    }

    onClickAddGrade(obj){
        this.setState({
            showForm:true,
            studentForGrade:obj
        })
    }

    onClickSaveGrade(obj){
        console.log(obj)
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

