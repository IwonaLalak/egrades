import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import SemestersContainer from "./tabs/SemestersTab/SemestersContainer";
import AccessContainer from "./tabs/AccessTab/AccessContainer";
import {Icon} from "../../app_components/IconComponent";

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
    }

    render() {

        return (
            <NavigationComponent currentLink={this.props.match.path} history={this.props.history}>
                <Row>
                    <Col xs={12}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab === '1') ? 'active' : ''}
                                    onClick={() => {
                                        this.setState({activeTab: '1'})
                                    }}
                                >
                                    <Icon type={'list'}/> Semesters
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab === '2') ? 'active' : ''}
                                    onClick={() => {
                                        this.setState({activeTab: '2'})
                                    }}
                                >
                                    <Icon type={'key'}/> Users & Access
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div style={{marginTop:'15px'}}>
                                <SemestersContainer/>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <div style={{marginTop:'15px'}}>
                                <Row>
                                    <Col sm="12">
                                        <AccessContainer/>
                                    </Col>
                                </Row>
                                </div>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </NavigationComponent>
        );
    }
}

