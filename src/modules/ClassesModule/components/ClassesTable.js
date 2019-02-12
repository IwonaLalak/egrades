import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class ClassesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderButtons(cell,row){
        return(
            <ButtonToolbar>
                <ButtonEdit outline={true} onClick={()=>{this.props.handleClickEdit(row)}} size={'sm'}/>
                <ButtonDelete outline={true} onClick={()=>{this.props.handleClickDelete(row)}} size={'sm'}/>
                <ButtonAction outline={true} onClick={()=>{this.props.handleClickDelete(row)}} size={'sm'} label={'akcja'}/>
            </ButtonToolbar>
        )
    }
    
    render() {

        return (
                    <div>
                        <div>
                            <BootstrapTable data={this.props.data}
                                            pagination
                                            hover
                            >
                                <TableHeaderColumn dataField='idCl' isKey hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='profile'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Profile</TableHeaderColumn>
                                <TableHeaderColumn dataField='startYear'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Start year</TableHeaderColumn>
                                <TableHeaderColumn dataField='idCl'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   dataFormat={(cell,row)=>this.renderButtons(cell,row)}
                                ></TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

