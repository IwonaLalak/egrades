import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../app_components/ButtonsComponents";

export default class TeachersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacher: {
                idTe: 0,
                firstname: '',
                surname: '',
                interests: '',
                notes:''
            }
        };
    }

    componentDidMount() {
        if (Boolean(this.props.editedObject)) {
            this.setEditedObj(this.props.editedObject)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (Boolean(nextprops.editedObject))
            this.setEditedObj(nextprops.editedObject)
    }

    setEditedObj(obj) {
        this.setState({teacher: obj})
        document.getElementById('inputFirstname').value = obj.firstname
        document.getElementById('inputSurname').value = obj.surname
        document.getElementById('inputInterests').value = obj.interests
        document.getElementById('inputNotes').value = obj.notes

    }


    setValueAndSave(key, val) {
        let obj = this.state.teacher;
        obj[key] = val
        this.setState({teacher: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.teacher.firstname) || !Boolean(this.state.teacher.surname)) {
            valid = false
            alert('Please fill all required inputs')
        }

        if (valid)
            this.props.handleClickSave(this.state.teacher, Boolean(this.props.editedObject))
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new or edit existing teacher</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Firstname<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'firstname')} id={'inputFirstname'}/>
                        </Col>
                        <Col xs={3}>
                            <Label>Surname<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'surname')} id={'inputSurname'}/>
                        </Col>
                        <Col xs={3}>
                            <Label>Interests</Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'interests')} id={'inputInterests'}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={9}>
                            <Label>Notes</Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'notes')} id={'inputNotes'}/>
                        </Col>
                        <Col xs={3}>
                            <LabelMargin/>
                            <ButtonToolbarCancelSave onClickCancel={() => {
                                this.props.handleClickCancel()
                            }} onClickSave={() => {
                                this.onClickSave()
                            }}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

