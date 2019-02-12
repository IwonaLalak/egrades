import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import SubjectsForm from "./components/SubjectsForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import {Col, Row} from "reactstrap";
import SubjectsTable from "./components/SubjectsTable";

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
        this.setState({data: arr})
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm: true})
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

    render() {

        return (
            <NavigationComponent>
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
