import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import StudentSearchbox from "./components/StudentSearchbox";
import StudentGradesTable from "./components/StudentGradesTable";

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
        this.setState({schoolClasses:arr})
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

    onClickSearch(parameters){
        this.setState({parameters:parameters})

        let url = '?idSt=' + parameters.idSt + '&idSe=' + parameters.idSe

        let arr = [
            {
                idSu: 2,
                name: 'Math',
                grades:[
                    {
                        idGr:1,
                        idSe: 1,
                        date: '2019-12-22',
                        grade: 3.5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    }
                ]
            },
            {
                idSu: 3,
                name: 'English',
                grades:[
                    {
                        idGr:2,
                        idSe: 1,
                        date: '2018-10-10',
                        grade: 4,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                    {
                        idGr:3,
                        idSe: 1,
                        date: '2018-10-22',
                        grade: 4.5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                    {
                        idGr:4,
                        idSe: 1,
                        date: '2018-11-05',
                        grade: 6,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    },
                ]
            },
            {
                idSu: 4,
                name: 'History',
                grades:[
                    {
                        idGr:5,
                        idSe: 1,
                        date: '2019-02-03',
                        grade: 3.5,
                        idTe: 1,
                        teacherFirstname: 'Jon',
                        teacherSurname: 'Snow',
                    }
                ]
            },
            {
                idSu: 5,
                name: 'Biology',
                grades:[
                    {
                        idGr:6,
                        idSe: 1,
                        date: '2018-11-11',
                        grade: 2.5,
                        idTe: 2,
                        teacherFirstname: 'Cersei',
                        teacherSurname: 'Lannister',
                    },
                    {
                        idGr:7,
                        idSe: 1,
                        date: '2018-12-05',
                        grade: 1,
                        idTe: 2,
                        teacherFirstname: 'Cersei',
                        teacherSurname: 'Lannister',
                    },
                ]
            },
        ]

        this.setState({data:arr})
    }

    render() {

        return (
                <NavigationComponent>
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

