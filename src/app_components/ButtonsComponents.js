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

export const ButtonAdd = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'success'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-plus'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonAdd.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonAdd.defaultProps = {
    label:'Add new',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonSave = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'primary'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-save'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonSave.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonSave.defaultProps = {
    label:'Save',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonClose = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'default'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-times'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonClose.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonClose.defaultProps = {
    label:'Close',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonCancel = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'default'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-times'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonCancel.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonCancel.defaultProps = {
    label:'Cancel',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonEdit = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'info'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-edit'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonEdit.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonEdit.defaultProps = {
    label:'Edit',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonDelete = (props) => {
    return (
        <Button
            onClick={props.onClick}
            size={props.size}
            color={'danger'}
            title={props.title}
            style={props.style}
            {...props}
        >
            <i className={'fa fa-trash'} style={{marginRight:'5px'}}></i> {props.label}
        </Button>
    );
};

ButtonDelete.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonDelete.defaultProps = {
    label:'Delete',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
};

export const ButtonAction = (props) => {
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

ButtonAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon:PropTypes.string,
    size:PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    outline:PropTypes.bool,

};

ButtonAction.defaultProps = {
    label:'Action',
    icon:'search',
    disabled:false,
    outline:false,
    size:'md', // sm, md, lg
    color:'warning'
};