import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../app_components/ButtonsComponents";
import Select from "react-select";

export default class GradesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject:null,
            student:null,
            schoolClass:null,
            semester:null,
            grades: [
                {label: '1.0', value: '1.0 '},
                {label: '2.0', value: '2.0 '},
                {label: '2.5', value: '1.5 '},
                {label: '3.0', value: '3.0 '},
                {label: '3.5', value: '3.5 '},
                {label: '4.0', value: '4.0 '},
                {label: '4.5', value: '4.5 '},
                {label: '5.0', value: '5.0 '},
                {label: '5.5', value: '5.5 '},
                {label: '6.0', value: '6.0 '},
            ],
            grade: null
        };
    }

    componentDidMount() {
        if (Boolean(this.props)) {
            this.setEditedObj(this.props)
        }
    }

    componentWillReceiveProps(nextprops) {
        if (Boolean(nextprops))
            this.setEditedObj(nextprops)
    }

    setEditedObj(props) {
        this.setState({
            subject:props.subject,
            student:props.student,
            schoolClass:props.schoolClass,
            semester:props.semester,
        })
    }

    onClickSave() {
        let valid = true

        if (!Boolean(this.state.grade)) {
            valid = false
            alert('Please fill required select')
        }

        if (valid)
            this.props.handleClickSave(
                {
                    grade:this.state.grade.value,
                    date:new Date().toJSON().substr(0,10),
                    idTe: 1, // todo: current logged from localstorage,
                    idSt: this.props.student.idSt,
                    idSu: this.state.subject.idSu,
                    idSe:this.state.semester.idSe,
                    idCl:this.state.schoolClass.idCl
                })
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new grade</h6>
                    <FormGroup row>
                        <Col xs={2}>
                            <Label>Subject<Req/></Label>
                            <Input disabled={true} defaultValue={(this.state.subject)? this.state.subject.name : ''} />
                        </Col>
                        <Col xs={3}>
                            <Label>Class<Req/></Label>
                            <Input disabled={true}
                                   defaultValue={(this.state.schoolClass)? this.state.schoolClass.name+' - '+ this.state.schoolClass.profile+', '+this.state.schoolClass.startYear: ''}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Student<Req/></Label>
                            <Input disabled={true} defaultValue={(this.state.student)? this.state.student.firstname+' '+this.state.student.surname : ''}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Grade<Req/></Label>
                            <Select options={this.state.grades}
                                    value={this.state.grade}
                                    onChange={(e) => {
                                        this.setState({grade: e})
                                    }}
                                    clearable={false}
                            />
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

