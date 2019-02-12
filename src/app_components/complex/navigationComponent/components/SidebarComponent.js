import React, {Component} from 'react';
import linksConfig from "../../../../app_utilities/linksConfig";
import {Link} from "react-router-dom";
import {Icon} from "../../../IconComponent";
import LoginService from "../../../../services/LoginService";

export default class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id={'sidebar'}>
                <ul>
                    {
                        linksConfig.getApplicationLinks().map(item=>{
                            if(LoginService.checkIfUserHasPermission(item.module))
                            return(<li>
                                <Link to={item.path}>
                                    <Icon type={item.icon}/> {item.name}
                                </Link>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}