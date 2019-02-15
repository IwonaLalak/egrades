import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";
import AppConfig from "../../../app_config/AppConfig";

export default class NavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <div id={'NavigationComponent'}>
                <HeaderComponent history={this.props.history}/>
                <div id={'container'}>
                    <SidebarComponent/>
                    <div id={'content'}>
                        {this.props.children}
                        <div id={'footer'}>
                            {AppConfig.APP_NAME() +' '+ AppConfig.APP_VER() +' '+ AppConfig.APP_UPDATE()} | Authors: {' '}
                            <a href="https://github.com/IwonaLalak" target="_blank">Iwona Lalak</a>
                            {' & '}
                            <a href="https://github.com/xenos28" target="_blank">Konrad Krężel</a>
                        </div>
                    </div>
                    <div style={{clear:'both',height:'1px'}}></div>
                </div>
            </div>
        );
    }
}

NavigationComponent.propTypes = {
   // links: PropTypes.object.isRequired,
}