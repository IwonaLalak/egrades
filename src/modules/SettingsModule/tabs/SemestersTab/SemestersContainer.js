import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {ButtonAdd} from "../../../../app_components/ButtonsComponents";
import SemestersTable from "./components/SemestersTable";
import SemestersForm from "./components/SemestersForm";
import SemestersService from "../../../../services/SemestersService";
import {NotificationManager} from "react-notifications";

export default class SemestersContainer extends Component {
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
        SemestersService.getAllSemesters().then((response) => {
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
            SemestersService.deleteSemester(obj.idSe).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully deleted')
                    this.loadData()
                }
            })
        }
    }

    onClickSave(obj, isEdition) {
        if (isEdition) {
            SemestersService.editSemester(obj.idSe,obj).then((response) => {
                if (response.status < 300) {
                    NotificationManager.success('Successfully edited')
                    this.loadData()
                }
            })
        } else {
            SemestersService.addSemester(obj).then((response) => {
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
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <SemestersForm
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
                            <SemestersTable data={this.state.data}
                                           handleClickEdit={(obj) => this.onClickEdit(obj)}
                                           handleClickDelete={(obj) => this.onClickDelete(obj)}

                            />
                        </Col>
                    </Row>
                </div>
        );
    }
}
