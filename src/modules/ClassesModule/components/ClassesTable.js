import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
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
                <ButtonEdit onClick={()=>{}} size={'sm'}/>
                <ButtonDelete onClick={()=>{}} size={'sm'}/>
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
                                <TableHeaderColumn dataField='number'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='startYear'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Start year</TableHeaderColumn>
                                <TableHeaderColumn dataField='idCl'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   dataFormat={(cell,row)=>{this.renderButtons(cell,row)}}
                                ></TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

