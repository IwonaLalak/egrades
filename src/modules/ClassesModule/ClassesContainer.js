import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import ClassesTable from "./components/ClassesTable";

export default class ClassesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
                <NavigationComponent>
                    <div>
                        classes compontent
                    </div>
                    <ClassesTable/>
                </NavigationComponent>
    );
    }
}

