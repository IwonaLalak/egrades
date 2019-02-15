import React, {Component} from 'react';
import tabgrid from "../../../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Select from 'react-select'
import {Icon} from "../../../../../app_components/IconComponent";

export default class AccessTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities:[{value:false,label:'yes'}, {value:true,label:'no'}],
        };
    }

    renderActive(cell,row){
        return(
            <div>
                <Select
                        value={this.state.activities.find(a=>a.value===cell)}
                        options={this.state.activities}
                        formatValueLabel={this.renderActiveSelect}
                        formatOptionLabel={this.renderActiveSelect}
                        onChange={(e) => {
                            let obj = row
                            obj['zablokowane'] = e.value
                            this.props.onChangeActive(obj)
                        }}
                        clearable={false}

                />
            </div>
        )
    }

    renderActiveSelect(option){     // is user blocked? no - good
        if(!option.value) return <div><Icon type={'check'} style={{color:'forestgreen'}}/> no</div>
        if(option.value) return <div><Icon type={'times'} style={{color:'firebrick'}}/> yes</div>
    }

    render() {

        return (
                    <div>
                        <div>
                            <BootstrapTable data={this.props.data}
                                            pagination
                                            hover
                            >
                                <TableHeaderColumn dataField='idUz' isKey hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='login' dataSort
                                                   thStyle={tabgrid.tg13} tdStyle={tabgrid.tg13}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Login</TableHeaderColumn>
                                <TableHeaderColumn dataField='typ' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Type</TableHeaderColumn>
                                <TableHeaderColumn dataField='typId' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >User</TableHeaderColumn>
                                <TableHeaderColumn dataField='zablokowany'
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   dataFormat={(cell,row)=>this.renderActive(cell,row)}
                                >Is blocked?</TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

