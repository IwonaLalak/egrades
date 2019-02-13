import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ButtonClose} from "../../ButtonsComponents";

export default class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id={'ModalComponent'}>
                <div id={'ModalContainer'}>
                    <div>
                        <div className={'pull-left'}>
                            <div id={'modalTitle'}>{this.props.title}</div>
                        </div>
                        <div className={'pull-right'}>
                            <ButtonClose onClick={() => {
                                this.props.handleClickCancel()
                            }}/>
                        </div>
                        <div style={{clear: 'both', height: '1px'}}></div>
                    </div>
                    <div id={'ModalContent'}>
                        {this.props.children}
                    </div>
                    <div style={{clear: 'both', height: '1px'}}></div>
                </div>
            </div>
        );
    }
}

ModalComponent.propTypes = {
    handleClickCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
}