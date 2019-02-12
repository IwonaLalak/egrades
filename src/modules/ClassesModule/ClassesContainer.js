import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import ClassesTable from "./components/ClassesTable";
import {Col, Row} from "reactstrap";
import ClassesForm from "./components/ClassesForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";

export default class ClassesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            editedObject: null
        };
    }

    componentDidMount() {
        // todo: popup with students in particular class
        this.loadData();
    }

    loadData() {
        let arr = [
            {
                idCl: 1,
                name: '1A',
                profile: 'Math and IT',
                startYear: 2018,

            }
        ]
        this.setState({data: arr})
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm:true})
    }

    onClickDelete(obj) {
        // rest
    }

    onClickSave(obj, isEdition) {
        console.log(obj)
        if (isEdition) {
            // rest put
        } else {
            // rest post
        }

        this.setState({showForm: false, editedObject: null})
    }

    onClickShowStudents(obj){



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
            </NavigationComponent>
        );
    }
}

