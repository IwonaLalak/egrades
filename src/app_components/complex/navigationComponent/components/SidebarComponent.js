import React, {Component} from 'react';

export default class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id={'sidebar'}>
                sidebar
                <ul>
                    <li>dsddssdsd</li>
                    <li>dsddssdsd</li>
                    <li>dsddssdsd</li>
                    <li>dsddssdsd</li>
                    <li>dsddssdsd</li>
                </ul>
            </div>
        );
    }
}