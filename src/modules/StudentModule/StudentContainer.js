import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";

export default class StudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
                <NavigationComponent>
                    <div>
                        single student compontent
                    </div>
                </NavigationComponent>
    );
    }
}

