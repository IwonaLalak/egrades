import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import AppConfig from "../../app_config/AppConfig";
import {Icon} from "../../app_components/IconComponent";
import {CustomButton} from "../../app_components/ButtonsComponents";
import LoginService from "../../services/LoginService";


export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials:{
                login: '',
                pass: ''
            }
        };
    }

    onChangeValue(key,value){
        let obj = this.state.credentials
        obj[key] = value
        this.setState({credentials:obj})
    }

    onClickLoginButton() {
        if(this.state.credentials.login.length === 0 || this.state.credentials.pass.length === 0){
            alert('Please type both login and password')
        }
        else{
            LoginService.logOut() // clear localStorage
            LoginService.loginUser(this.state.credentials).then(response=>{
                if(response.status<300){
                    let token = 'Basic ' + btoa(this.state.credentials.login + ':' + this.state.credentials.pass)

                    LoginService.setUserLogged(Object.assign(response.data.user,{token: token}),token)

                    this.props.history.push('/')
                }
            })
        }
    }

    render() {

        return (
            <div id={'LoginContainer'}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div id={'LoginFormContainer'}>
                                <div>
                                    <h1>{AppConfig.APP_NAME()}
                                        <small>{AppConfig.APP_VER()}</small>
                                    </h1>
                                    <Form>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText><Icon type={'user'} addMarginRight={false}/></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={(e)=>this.onChangeValue('login',e.target.value)}/>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText><Icon type={'lock'} addMarginRight={false}/></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type={'password'} onChange={(e)=>this.onChangeValue('pass',e.target.value)}/>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <div id={'buttonContainer'}>
                                                    <CustomButton
                                                        onClick={() => this.onClickLoginButton()}
                                                        color={'primary'}
                                                        disabled={(this.state.credentials.login.length === 0) || (this.state.credentials.pass.length === 0)}
                                                        label={'Login'}
                                                        icon={'sign-in'}
                                                    />
                                                </div>
                                            </Col>
                                        </FormGroup>

                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

