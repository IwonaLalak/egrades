import React from 'react';
import PropTypes from 'prop-types';

export const Req = (props) => {
    return (
        <span style={{color:'firebrick', margin:'0 3px'}}>*</span>
    );
};

Req.propTypes = {

};

Req.defaultProps = {
};

export const LabelMargin = (props) => {
    return (
        <div className={'add-label-margin'}></div>
    );
};

LabelMargin.propTypes = {

};

LabelMargin.defaultProps = {
};