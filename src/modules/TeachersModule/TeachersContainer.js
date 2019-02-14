import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import TeachersForm from "./components/TeachersForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import TeachersTable from "./components/TeachersTable";
import TeachersService from "../../services/TeachersService";
import {NotificationManager} from "react-notifications";

export default class TeachersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            editedObject: null
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        TeachersService.getAllTeachers().then((response) => {
            if (response.status < 300) {
                this.setState({
                    data: response.data,
                })
            }
        })
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm:true})
    }

    onClickDelete(obj) {
        if (window.confirm('Are you sure to delete data')) {
            TeachersService.deleteTeacher(obj.idTe).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully deleted')
                    this.loadData()
                }
            })
        }
    }

    onClickSave(obj, isEdition) {
        if (isEdition) {
            TeachersService.editTeacher(obj.idTe,obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully edited')
                    this.loadData()
                }
            })
        } else {
            TeachersService.addTeacher(obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully added')
                    this.loadData()
                }
            })
        }

        this.setState({showForm: false, editedObject: null})
    }

    render() {

        return (
            <NavigationComponent>
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <TeachersForm
                                        handleClickSave={(obj, isEdition) => this.onClickSave(obj, isEdition)}
                                        handleClickCancel={() => {
                                            this.setState({showForm: false, editedObject: null})
                                        }}
                                        editedObject={this.state.editedObject}
                                    />
                                    :
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => this.setState({showForm: true})}/>
                                    </div>
                            }
                        </Col>
                        <Col xs={12}>
                            <TeachersTable data={this.state.data}
                                          handleClickEdit={(obj) => this.onClickEdit(obj)}
                                          handleClickDelete={(obj) => this.onClickDelete(obj)}

                            />
                        </Col>
                    </Row>
                </div>
            </NavigationComponent>
    );
    }
}

