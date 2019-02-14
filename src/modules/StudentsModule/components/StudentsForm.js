import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../app_components/ButtonsComponents";
import Select from 'react-select'

export default class StudentsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                idSt: 0,
                firstname: '',
                surname: '',
                personalNumber: '',
                adress: '',
                notes: '',
                idCl: 0
            },
            schoolClass: null
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
        this.setState({
            student: obj,
            schoolClass: this.props.schoolClasses.find(c => c.idCl === obj.idCl)
        })
        document.getElementById('inputFirstname').value = obj.firstname
        document.getElementById('inputSurname').value = obj.surname
        document.getElementById('inputPersonalNumber').value = obj.personalNumber
        document.getElementById('inputAdress').value = obj.adress
        document.getElementById('inputNotes').value = obj.notes

    }


    setValueAndSave(key, val) {
        let obj = this.state.student;
        obj[key] = val
        this.setState({student: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onChangeSchoolClass(e) {
        this.setState({schoolClass: e})
        this.setValueAndSave('idCl', e.idCl)
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.student.firstname) || !Boolean(this.state.student.surname) || !Boolean(this.state.student.personalNumber) || !Boolean(this.state.schoolClass)) {
            valid = false
            alert('Please fill all required inputs')
        }

        if (valid){
            this.props.handleClickSave(this.state.student, Boolean(this.props.editedObject))
        }

    }


    renderSchoolClass(option) {
        return (
            <div>
                <span className={'badge badge-secondary'}>{option.name}</span> - {option.profile + ', ' + option.startYear}
            </div>
        )
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new or edit existing student</h6>
                    <FormGroup row>
                        <Col xs={2}>
                            <Label>Firstname<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'firstname')} id={'inputFirstname'}/>
                        </Col>
                        <Col xs={3}>
                            <Label>Surname<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'surname')} id={'inputSurname'}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Personal number (pesel)<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'personalNumber')} id={'inputPersonalNumber'}/>
                        </Col>
                        <Col xs={3}>
                            <Label>Adress</Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'adress')} id={'inputAdress'}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={5}>
                            <Label>Class<Req/></Label>
                            <Select options={this.props.schoolClasses}
                                    value={this.state.schoolClass}
                                    formatValueLabel={this.renderSchoolClass}
                                    formatOptionLabel={this.renderSchoolClass}
                                    onChange={(e) => {
                                        this.onChangeSchoolClass(e)
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={5}>
                            <Label>Notes</Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'notes')} id={'inputNotes'}/>
                        </Col>
                        <Col xs={2}>
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

