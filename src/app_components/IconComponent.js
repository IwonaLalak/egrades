import React from 'react';
import PropTypes from 'prop-types';

export const Icon = (props) => {
    return (
        <i
            className={'fa fa-' + props.type + ((props.spin) ? ' fa-spin' : '')}
            style={props.addMarginRight?{marginRight:'5px', ...props.style}:props.style}
            title={props.title}
        >
        </i>
    );
};

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    title: PropTypes.string,
    spin: PropTypes.bool,
    addMarginRight: PropTypes.bool,

};

Icon.defaultProps = {
    type: 'check',
    spin: false,
    addMarginRight:true
};