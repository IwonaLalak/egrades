import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import ClassesTable from "./components/ClassesTable";
import {Col, Row} from "reactstrap";
import ClassesForm from "./components/ClassesForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import ModalComponent from "../../app_components/complex/modalComponent/ModalComponent";
import StudentsTable from "../StudentsModule/components/StudentsTable";
import Utils from "../../app_utilities/Utils";
import SchoolClassesService from "../../services/SchoolClassesService";
import {NotificationManager} from "react-notifications";
import StudentsService from "../../services/StudentsService";

export default class ClassesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            schoolClassesForSelect: [],
            editedObject: null,
            showModal: false,
            dataForModal: null
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        SchoolClassesService.getAllSchoolClasses().then((response) => {
            if (response.status < 300)
                this.setState({
                    data: response.data,
                    schoolClassesForSelect: Utils.changeTabOfObjectsToSimpleObject(response.data, 'idCl', 'name', 'startYear', 'profile')
                })
        })

    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm: true})
    }

    onClickDelete(obj) {
        if (window.confirm('Are you sure to delete data?')) {
            SchoolClassesService.deleteSchoolClass(obj.idCl).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully deleted')
                    this.loadData()
                }
            })
        }
    }

    onClickSave(obj, isEdition) {
        if (isEdition) {
            SchoolClassesService.editSchoolClass(obj.idCl, obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully edited')
                    this.loadData()
                }
            })
        } else {
            SchoolClassesService.addSchoolClass(obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully added')
                    this.loadData()
                }
            })
        }

        this.setState({showForm: false, editedObject: null})
    }

    onClickShowStudents(obj) {
        StudentsService.getStudentsInClass(obj.idCl).then((response)=>{
            if (response.status < 300) {
                this.setState({
                    showModal: true,
                    dataForModal: [obj, response.data]
                })
            }
        })
    }

    render() {

        return (
            <NavigationComponent>
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <ClassesForm
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
                            <ClassesTable data={this.state.data}
                                          handleClickEdit={(obj) => this.onClickEdit(obj)}
                                          handleClickDelete={(obj) => this.onClickDelete(obj)}
                                          handleClickShowStudents={(obj) => this.onClickShowStudents(obj)}

                            />
                        </Col>
                    </Row>
                </div>
                {
                    (Boolean(this.state.dataForModal) && this.state.showModal) ?
                        <ModalComponent handleClickCancel={() => {
                            this.setState({showNodal: false, dataForModal: null})
                        }}
                                        title={'Students in ' + this.state.dataForModal[0].name
                                        + ' - ' + this.state.dataForModal[0].profile + ', ' + this.state.dataForModal[0].startYear
                                        }>
                            <div>
                                <StudentsTable
                                    data={this.state.dataForModal[1]}
                                    schoolClasses={this.state.data}
                                    schoolClassesForSelect={this.state.schoolClassesForSelect}
                                    disableEditAndRemoveButtons={true}

                                />
                            </div>
                        </ModalComponent>
                        :
                        ''
                }

            </NavigationComponent>
        );
    }
}

