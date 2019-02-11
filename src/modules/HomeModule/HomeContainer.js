import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
                <NavigationComponent links={[]}>
                    <div>
                        home compontent
                    </div>
                </NavigationComponent>
    );
    }
}

