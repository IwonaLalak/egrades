import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import TeachersForm from "./components/TeachersForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import TeachersTable from "./components/TeachersTable";

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
        let arr = [
            {
                idTe: 1,
                firstname: 'Jon',
                surname: 'Snow',
                interests: 'IT, Math',
                notes:''
            },
            {
                idTe: 2,
                firstname: 'Cersei',
                surname: 'Lannister',
                interests: 'History, English',
                notes:'Has vacation: 1 - 15 jan 2019'
            },
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

