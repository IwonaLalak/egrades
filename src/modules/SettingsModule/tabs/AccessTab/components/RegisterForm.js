import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import {LabelMargin, Req} from "../../../../../app_components/FormsSmallComponents";
import {ButtonToolbarCancelSave} from "../../../../../app_components/ButtonsComponents";
import Select from 'react-select'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                login: '',
                pass: '',
                userTypeName: 'STUDENT',   // TEACHER , STUDENT ,   --ADMIN
                typeId: null,
            },
            types: [{value: 'STUDENT', label: 'Student'}, {value: 'TEACHER', label: 'Teacher'}],
            type: {value: 'STUDENT', label: 'Student'},
            selectedUser: null
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextprops) {

    }


    setValueAndSave(key, val) {
        let obj = this.state.user;
        obj[key] = val
        this.setState({user: obj})
    }

    onChangeValue(e, key) {
        // missing validation
        this.setValueAndSave(key, e.target.value)
    }

    onChangeType(e) {
        this.setState({type: e, selectedUser: null})
        this.setValueAndSave('userTypeName', e.value)
    }

    onChangeUser(e) {
        this.setState({selectedUser: e})
        if (this.state.user.userTypeName === 'STUDENT') this.setValueAndSave('typeId', e.idSt)
        else this.setValueAndSave('typeId', e.idTe)
    }

    onClickSave() {
        let valid = true
        if (!Boolean(this.state.user.login) || !Boolean(this.state.user.typeId) || !Boolean(this.state.user.userTypeName)) {
            valid = false
            alert('Please fill required input and selects')
        }
        if (!Boolean(this.state.user.pass)) {
            valid = false
            alert('Please input passwors')
        }else{
            if(this.state.user.pass.length<8){
                valid = false
                alert('Password must have 8 characters at least')
            }
        }

        if (valid)
            this.props.handleClickSave(this.state.user)
    }

    renderUser(option) {
        return option.firstname + ' ' + option.surname
    }

    render() {

        return (
            <div>
                <Form>
                    <h6>Add new access for existing user</h6>
                    <FormGroup row>
                        <Col xs={2}>
                            <Label>Type<Req/></Label>
                            <Select value={this.state.type} options={this.state.types} onChange={(e) => this.onChangeType(e)} clearable={false}/>
                        </Col>

                        <Col xs={2}>
                            <Label>User<Req/></Label>
                            <Select value={this.state.selectedUser}
                                    options={this.state.user.userTypeName === 'STUDENT' ? this.props.students : this.props.teachers}
                                    onChange={(e) => this.onChangeUser(e)}
                                    formatValueLabel={this.renderUser}
                                    formatOptionLabel={this.renderUser}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={2}>
                            <Label>Login<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'login')} id={'inputLogin'}/>
                        </Col>
                        <Col xs={2}>
                            <Label>Password<Req/></Label>
                            <Input onChange={(e) => this.onChangeValue(e, 'pass')} id={'inputPass'} type={'password'}/>
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

