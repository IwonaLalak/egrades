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
                <ButtonAction outline={true} onClick={()=>{this.props.handleClickShowStudents(row)}} size={'sm'} label={'Show students'}/>
                <ButtonEdit outline={true} onClick={()=>{this.props.handleClickEdit(row)}} size={'sm'}/>
                <ButtonDelete outline={true} onClick={()=>{this.props.handleClickDelete(row)}} size={'sm'}/>
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
                                <TableHeaderColumn dataField='name' dataSort
                                                   thStyle={tabgrid.tg7} tdStyle={tabgrid.tg7}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='profile' dataSort
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Profile</TableHeaderColumn>
                                <TableHeaderColumn dataField='startYear' dataSort
                                                   thStyle={tabgrid.tg8} tdStyle={tabgrid.tg8}
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

