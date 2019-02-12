import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {ButtonAction, ButtonAdd, ButtonCancel, ButtonClose, ButtonDelete, ButtonEdit, ButtonSave} from "../../app_components/ButtonsComponents";

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
                <NavigationComponent>
                    <div>
                        home compontent
                    </div>
                    <div>
                        <ButtonAdd onClick={()=>{}}/>
                        <ButtonClose onClick={()=>{}}/>
                        <ButtonSave onClick={()=>{}}/>
                        <ButtonDelete onClick={()=>{}}/>
                        <ButtonEdit onClick={()=>{}}/>
                        <ButtonCancel onClick={()=>{}}/>
                        <ButtonAction onClick={()=>{}} label={'Action'}/>
                    </div>
                </NavigationComponent>
    );
    }
}

