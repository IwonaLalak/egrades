import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonDelete, ButtonEdit} from "../../../../../app_components/ButtonsComponents";
import tabgrid from "../../../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Icon} from "../../../../../app_components/IconComponent";

export default class SemestersTable extends Component {
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

    renderIsCurrent(cell,row){
        if(cell){
            return <span><Icon type={'check'} style={{color:'forestgreen'}}/>yes</span>
        }else{
            return <span><Icon type={'times'} style={{color:'grey'}}/>no</span>
        }
    }

    render() {

        return (
                    <div>
                        <div>
                            <BootstrapTable data={this.props.data}
                                            pagination
                                            hover
                            >
                                <TableHeaderColumn dataField='idSe' isKey hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'
                                                   thStyle={tabgrid.tg13} tdStyle={tabgrid.tg13} dataSort
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Semestr name</TableHeaderColumn>
                                <TableHeaderColumn dataField='dateSince' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Date sinse</TableHeaderColumn>
                                <TableHeaderColumn dataField='dateTo' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Date to</TableHeaderColumn>
                                <TableHeaderColumn dataField='isCurrent' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                                   dataFormat={this.renderIsCurrent}
                                >Is current?</TableHeaderColumn>
                                <TableHeaderColumn dataField='idSe'
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   dataFormat={(cell,row)=>this.renderButtons(cell,row)}
                                ></TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

