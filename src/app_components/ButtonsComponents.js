import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'

export const CustomButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={props.color}
            title={props.title}
            style={props.style}
            {...props}
        >
            {(props.icon)?<i className={'fa fa-'+props.icon} style={{marginRight:'5px'}}></i> : ''}
            {props.label}
        </Button>
    );
};

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.any.isRequired,
    icon:PropTypes.string,
    color:PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

CustomButton.defaultProps = {
    disabled:false,
    outline:false,
    color:'secondary',    // primary, secondary, success, danger, warning, info, light, dark
    size:'md', // sm, md, lg
};