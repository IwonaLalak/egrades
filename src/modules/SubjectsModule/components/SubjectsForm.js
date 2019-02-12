import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../app_components/ButtonsComponents";

export default class SubjectsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: {
                idSu: 0,
                name: '',
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
        this.setState({subject: obj})
        document.getElementById('inputName').value = obj.name

    }


    setValueAndSave(key, val) {
        let obj = this.state.subject;
        obj[key] = val
        this.setState({subject: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.subject.name)) {
            valid = false
            alert('Please fill required input')
        }

        if (valid)
            this.props.handleClickSave(this.state.subject, Boolean(this.props.editedObject))
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new or edit existing subject</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Name<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'name')} id={'inputName'}/>
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

