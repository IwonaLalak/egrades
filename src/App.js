import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import LoginContainer from "./modules/LoginModule/LoginContainer";
import HomeContainer from "./modules/HomeModule/HomeContainer";
import accessConfig from "./app_access/accessConfig";
import ClassesContainer from "./modules/ClassesModule/ClassesContainer";
import GradesContainer from "./modules/GradesModule/GradesContainer";
import SettingsContainer from "./modules/SettingsModule/SettingsContainer";
import StudentsContainer from "./modules/StudentsModule/StudentsContainer";
import StudentContainer from "./modules/StudentModule/StudentContainer";
import SubjectsContainer from "./modules/SubjectsModule/SubjectsContainer";
import TeachersContainer from "./modules/TeachersModule/TeachersContainer";
import LoginService from "./services/LoginService";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {

    if (Boolean(error.response)) {
        NotificationManager.error('Error code: ' + error.response.data.status + ', error: ' + error.response.data.error + ', message: ' + error.response.data.message, 'Can not make the request', 10000);
        console.log(error.response)
    }else{
        console.log(error)
        NotificationManager.error('Can not make the request - API error. Details in console.')
    }

    return Promise.reject(error);
});

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

if (LoginService.checkIfUserIsLogged()) {
    if (LoginService.getLoggedUser().token.indexOf('Basic') > -1) {
        axios.defaults.headers.common.Authorization = LoginService.getLoggedUser().token;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => LoginService.checkIfUserHasPermission('HOME') ?
                            <HomeContainer  {...props}  /> : <LoginContainer  {...props}/>}/>
                        <Route exact path="/classes" render={(props) => LoginService.checkIfUserHasPermission('CLASSES') ?
                            <ClassesContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/grades" render={(props) => LoginService.checkIfUserHasPermission('GRADES') ?
                            <GradesContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/settings" render={(props) => LoginService.checkIfUserHasPermission('SETTINGS') ?
                            <SettingsContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/students" render={(props) => LoginService.checkIfUserHasPermission('STUDENTS') ?
                            <StudentsContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/student" render={(props) => LoginService.checkIfUserHasPermission('STUDENT') ?
                            <StudentContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/subjects" render={(props) => LoginService.checkIfUserHasPermission('SUBJECTS') ?
                            <SubjectsContainer  {...props}  /> : <Redirect to="/"/>}/>
                        <Route exact path="/teachers" render={(props) => LoginService.checkIfUserHasPermission('TEACHERS') ?
                            <TeachersContainer  {...props}  /> : <Redirect to="/"/>}/>

                        <Redirect to="/"/>
                    </Switch>
                </Router>
                <NotificationContainer/>
            </div>
        );
    }
}

export default App;
