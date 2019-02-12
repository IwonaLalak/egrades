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
            </div>
        );
    }
}

export default App;
