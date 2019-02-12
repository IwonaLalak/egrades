import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../app_components/ButtonsComponents";

export default class ClassesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolclass: {
                idCl: 0,
                name: '',
                profile: '',
                startYear: new Date().toJSON().substr(0, 4),
            }
        };
    }

    componentDidMount() {
        if (Boolean(this.props.editedObject)) {
            this.setEditedObj(this.props.editedObject)

        } else {
            document.getElementById('inputStartYear').value = new Date().toJSON().substr(0, 4)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (Boolean(nextprops.editedObject))
            this.setEditedObj(nextprops.editedObject)
    }

    setEditedObj(obj) {
        this.setState({schoolclass: obj})
        document.getElementById('inputStartYear').value = obj.startYear
        document.getElementById('inputName').value = obj.name
        document.getElementById('inputProfile').value = obj.profile

    }


    setValueAndSave(key, val) {
        let obj = this.state.schoolclass;
        obj[key] = val
        this.setState({schoolclass: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.schoolclass.startYear) || !Boolean(this.state.schoolclass.profile) || !Boolean(this.state.schoolclass.name)) {
            valid = false
            alert('Please fill all required inputs')
        }
        else {
            if (!/^(19[5-9]\d|20[0-4]\d|2050)$/.test(this.state.schoolclass.startYear)) {
                valid = false
                alert('Bad year format. Please use between 1950-2050')
            }
        }


        if (valid)
            this.props.handleClickSave(this.state.schoolclass, Boolean(this.props.editedObject))
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new or edit existing class</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Name<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'name')} id={'inputName'}/>
                        </Col>
                        <Col xs={3}>
                            <Label>Profile<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'profile')} id={'inputProfile'}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Start year<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'startYear')} type={'number'} id={'inputStartYear'}/>
                        </Col>
                        <Col xs={4}>
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

