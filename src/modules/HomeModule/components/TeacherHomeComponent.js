import React, {Component} from 'react';
import LoginService from "../../../services/LoginService";

export default class TeacherHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {

        return (
            <div>
                <h4>
                    Hello, {this.props.user.login}!
                </h4>
            </div>
        );
    }
}

