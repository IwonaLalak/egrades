import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class TeachersTable extends Component {
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
                                <TableHeaderColumn dataField='idTe' isKey hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='firstname' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Firstname</TableHeaderColumn>
                                <TableHeaderColumn dataField='surname' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Surname</TableHeaderColumn>
                                <TableHeaderColumn dataField='interests' dataSort
                                                   thStyle={tabgrid.tg6} tdStyle={tabgrid.tg6}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Interests</TableHeaderColumn>
                                <TableHeaderColumn dataField='notes' dataSort
                                                   thStyle={tabgrid.tg10} tdStyle={tabgrid.tg10}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Notes</TableHeaderColumn>
                                <TableHeaderColumn dataField='idTe'
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   dataFormat={(cell,row)=>this.renderButtons(cell,row)}
                                ></TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

