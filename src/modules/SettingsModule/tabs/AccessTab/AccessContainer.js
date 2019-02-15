import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {ButtonAdd} from "../../../../app_components/ButtonsComponents";
import {NotificationManager} from "react-notifications";
import AccessTable from "./components/AccessTable";
import UsersService from "../../../../services/UsersService";
import RegisterForm from "./components/RegisterForm";
import TeachersService from "../../../../services/TeachersService";
import StudentsService from "../../../../services/StudentsService";
import LoginService from "../../../../services/LoginService";

export default class AccessContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            students:[],
            teachers:[],
        };
    }

    componentDidMount() {
        this.loadData();
        this.getTeachers();
        this.getStudents();
    }

    loadData() {
        this.setState({data:[]})
        UsersService.getAllUsers().then((response) => {
            if (response.status < 300) {
                this.setState({
                    data: response.data,
                })
            }
        })
    }

    getTeachers(){
        TeachersService.getAllTeachers().then((response) => {
            if (response.status < 300) {
                this.setState({
                    teachers: response.data,
                })
            }
        })
    }

    getStudents(){
        StudentsService.getAllStudents().then((response) => {
            if (response.status < 300) {
                this.setState({
                    students: response.data,
                })
            }
        })
    }

    onChangeActive(obj){
        UsersService.changeUser(obj.idUz,obj).then((response) => {
            if (response.status < 300) {
                NotificationManager.success('Successfully changed')
                this.loadData()
            }
        })
    }

    onRegister(obj){
        LoginService.registerUser(obj).then((response) => {
            if (response.status < 300) {
                NotificationManager.success('Successfully registered')
                this.loadData()
            }
        })
    }

    render() {

        return (
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <RegisterForm
                                        students={this.state.students}
                                        teachers={this.state.teachers}
                                        handleClickSave={(obj) => this.onRegister(obj)}
                                        handleClickCancel={() => {
                                            this.setState({showForm: false, editedObject: null})
                                        }}
                                    />
                                    :
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => this.setState({showForm: true})}/>
                                    </div>
                            }
                        </Col>
                        <Col xs={12}>
                            <AccessTable data={this.state.data}
                                         onChangeActive={(obj)=>this.onChangeActive(obj)}
                            />
                        </Col>
                    </Row>
                </div>
        );
    }
}
