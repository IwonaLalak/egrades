import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import SubjectsForm from "./components/SubjectsForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import {Col, Row} from "reactstrap";
import SubjectsTable from "./components/SubjectsTable";
import SubjectsService from "../../services/SubjectsService";
import {NotificationManager} from "react-notifications";

export default class SubjectsContainer extends Component {
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
        SubjectsService.getAllSubjects().then((response) => {
            if (response.status < 300) {
                this.setState({
                    data: response.data,
                })
            }
        })
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm: true})
    }

    onClickDelete(obj) {
        if (window.confirm('Are you sure to delete data')) {
            SubjectsService.deleteSubject(obj.idSu).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully deleted')
                    this.loadData()
                }
            })
        }
    }

    onClickSave(obj, isEdition) {
        if (isEdition) {
            SubjectsService.editSubject(obj.idSu,obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully edited')
                    this.loadData()
                }
            })
        } else {
            SubjectsService.addSubject(obj).then((response) => {
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
                                    <SubjectsForm
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
                            <SubjectsTable data={this.state.data}
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
