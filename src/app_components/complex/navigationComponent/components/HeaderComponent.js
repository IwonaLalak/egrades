import React, {Component} from 'react';
import AppConfig from "../../../../app_config/AppConfig";
import {Button} from "reactstrap";
import {Icon} from "../../../IconComponent";
import LoginService from "../../../../services/LoginService";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClickLogout(){
        LoginService.logOut();
        this.props.history.push('/')
    }

    render() {

        return (
            <div id={'header'}>
                <div id={'appName'}>
                    {AppConfig.APP_NAME()}<small>{AppConfig.APP_VER()}</small>
                </div>
                <div id={'logoutButton'}>
                    <Button onClick={()=>this.onClickLogout()} color={'danger'} size={'sm'}>
                        <Icon type={'power-off'} addMarginRight={false}/>
                    </Button>
                </div>
                <div style={{clear:'both',height:'1px'}}></div>
            </div>
        );
    }
}
