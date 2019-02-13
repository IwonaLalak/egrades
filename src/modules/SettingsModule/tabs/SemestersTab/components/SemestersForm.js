import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../../../app_components/ButtonsComponents";

export default class SemestersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: {
                idSe: 0,
                dateSince: '',
                dateTo: '',
                name: '',
                isCurrent: false,
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
        this.setState({semester: obj})
        document.getElementById('inputName').value = obj.name
        document.getElementById('inputDateSince').value = obj.dateSince
        document.getElementById('inputDateTo').value = obj.dateTo
        document.getElementById('checkboxCurrent').checked = obj.isCurrent

    }


    setValueAndSave(key, val) {
        let obj = this.state.semester;
        obj[key] = val
        this.setState({semester: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.semester.name) || !Boolean(this.state.semester.dateSince) || !Boolean(this.state.semester.dateTo)) {
            valid = false
            alert('Please fill required input')
        }
        else {
            if (this.state.semester.dateSince > this.state.semester.dateTo) {
                valid = false
                alert('Please choose correct dates')
            }
        }

        if (valid)
            this.props.handleClickSave(this.state.semester, Boolean(this.props.editedObject))
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new or edit existing semester</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Name<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'name')} id={'inputName'}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Date since<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'dateSince')} id={'inputDateSince'} type={'date'}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Date to<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'dateTo')} id={'inputDateTo'} type={'date'}/>
                        </Col>
                        <Col xs={1}>
                            <LabelMargin/>
                            <Label check>
                                <Input type="checkbox" id={'checkboxCurrent'}
                                       onClick={() => {
                                           this.setValueAndSave('isCurrent', !this.state.semester.isCurrent)
                                       }}/>{' '}
                                Is current?
                            </Label>
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

