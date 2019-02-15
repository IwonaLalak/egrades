import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import StudentsForm from "./components/StudentsForm";
import StudentsTable from "./components/StudentsTable";
import Utils from "../../app_utilities/Utils";
import SchoolClassesService from "../../services/SchoolClassesService";
import {NotificationManager} from "react-notifications";
import StudentsService from "../../services/StudentsService";

export default class StudentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            editedObject: null,
            schoolClasses: [],
            schoolClassesForSelect: [],
        };
    }

    componentDidMount() {
        this.loadData();
        this.loadSchoolClasses();
    }

    loadData() {
        StudentsService.getAllStudents().then((response) => {
            if (response.status < 300) {
                this.setState({
                    data: response.data,
                })
            }
        })
    }

    loadSchoolClasses() {
        SchoolClassesService.getAllSchoolClasses().then((response) => {
            if (response.status < 300) {
                this.setState({
                    schoolClasses: response.data,
                    schoolClassesForSelect: Utils.changeTabOfObjectsToSimpleObject(response.data, 'idCl', 'name', 'startYear', 'profile')
                })
            }
        })
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm: true})
    }

    onClickDelete(obj) {
        if (window.confirm('Are you sure to delete data')) {
            StudentsService.deleteStudent(obj.idSt).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully deleted')
                    this.loadData()
                }
            })
        }
    }

    onClickSave(obj, isEdition) {
        if (isEdition) {
            StudentsService.editStudent(obj.idSt, obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully edited')
                    this.loadData()
                }
            })
        } else {
            StudentsService.addStudent(obj).then((response) => {
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
            <NavigationComponent currentLink={this.props.match.path} history={this.props.history}>
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <StudentsForm
                                        handleClickSave={(obj, isEdition) => this.onClickSave(obj, isEdition)}
                                        handleClickCancel={() => {
                                            this.setState({showForm: false, editedObject: null})
                                        }}
                                        editedObject={this.state.editedObject}
                                        schoolClasses={this.state.schoolClasses}
                                    />
                                    :
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => this.setState({showForm: true})}/>
                                    </div>
                            }
                        </Col>
                        <Col xs={12}>
                            <StudentsTable data={this.state.data}
                                           handleClickEdit={(obj) => this.onClickEdit(obj)}
                                           handleClickDelete={(obj) => this.onClickDelete(obj)}
                                           schoolClasses={this.state.schoolClasses}
                                           schoolClassesForSelect={this.state.schoolClassesForSelect}
                                           disableNumber={true}
                                           disableAddGradeButton={true}

                            />
                        </Col>
                    </Row>
                </div>
            </NavigationComponent>
        );
    }
}

