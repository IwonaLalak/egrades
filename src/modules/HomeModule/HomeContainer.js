import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {ButtonAction, ButtonAdd, ButtonCancel, ButtonClose, ButtonDelete, ButtonEdit, ButtonSave} from "../../app_components/ButtonsComponents";
import LoginService from "../../services/LoginService";
import StudentHomeComponent from "./components/StudentHomeComponent";
import TeacherHomeComponent from "./components/TeacherHomeComponent";

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: LoginService.getLoggedUser()
        };
    }



    render() {

        return (
                <NavigationComponent currentLink={this.props.match.path} history={this.props.history}>
                    <div id={'HomeComponent'}>
                    {
                        LoginService.checkIfSTUDENT()?
                            <StudentHomeComponent/>
                            :
                            LoginService.checkIfTEACHER()?
                                <TeacherHomeComponent user={this.state.user}/>
                                :
                                <h4>
                                    Hello, Admin!
                                </h4>
                    }
                    </div>
                </NavigationComponent>
    );
    }
}

