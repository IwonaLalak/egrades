import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import LoginContainer from "./modules/LoginModule/LoginContainer";
import HomeContainer from "./modules/HomeModule/HomeContainer";
import accessConfig from "./app_access/accessConfig";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    checkIfUserHasPermission(module) {
        // users: admin, teacher, student

        // todo for now

        let localStorageUser = {id: 1, name: 'Jon X', type: null}
        if (!Boolean(localStorageUser)) {
            return false
        }
        else {
            return (accessConfig.checkAccess(localStorageUser.type).indexOf(module) > -1)
        }


    }


    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => this.checkIfUserHasPermission('HOME') ?
                            <HomeContainer  {...props}  /> : <LoginContainer  {...props}/>}/>

                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
