import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class StudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderButtons(cell,row){

        return(
            <ButtonToolbar>
                {
                    (this.props.disableAddGradeButton) ?
                        ''
                        :
                        <ButtonAction outline={true} onClick={()=>this.props.handleClickAddGrade(row)} label={'Add Grade'} icon={'plus'}/>
                }
                {
                    (this.props.disableEditAndRemoveButtons)?
                        ''
                        :
                <ButtonEdit outline={true} onClick={()=>{this.props.handleClickEdit(row)}} size={'sm'}/>
                }
                {
                    (this.props.disableEditAndRemoveButtons)?
                        ''
                        :
                <ButtonDelete outline={true} onClick={()=>{this.props.handleClickDelete(row)}} size={'sm'}/>
                }
            </ButtonToolbar>
        )
    }

    renderClass(cell,row){
        let schoolClass = this.props.schoolClasses.find(c=>c.idCl ===cell)
        if(Boolean(schoolClass)){
            return(<div>
                <span className={'badge badge-secondary'}>{schoolClass.name}</span> - {schoolClass.profile + ', ' + schoolClass.startYear}
            </div>)
        }
    }

    renderNumber(cell,row){
        return parseInt(this.props.data.indexOf(row))+1
    }

    render() {

        return (
                    <div>
                        <div>
                            <BootstrapTable data={this.props.data}
                                            pagination
                                            hover
                            >
                                <TableHeaderColumn dataField='idSt' isKey hidden={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='idSt'
                                                   thStyle={tabgrid.tg1} tdStyle={tabgrid.tg1}
                                                   dataFormat={(cell,row)=>this.renderNumber(cell,row)}
                                                   hidden={this.props.disableNumber}
                                >No.</TableHeaderColumn>
                                <TableHeaderColumn dataField='firstname' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Firstname</TableHeaderColumn>
                                <TableHeaderColumn dataField='surname' dataSort
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Surname</TableHeaderColumn>
                                <TableHeaderColumn dataField='adress' dataSort
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Adress</TableHeaderColumn>
                                <TableHeaderColumn dataField='idCl'
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'SelectFilter', options: this.props.schoolClassesForSelect, selectText: 'Choose',condition: 'eq'}}
                                                   formatDataExtra={this.props.schoolClassesForSelect}
                                                   dataFormat={(cell,row)=>this.renderClass(cell,row)}
                                >Class</TableHeaderColumn>
                                <TableHeaderColumn dataField='notes' dataSort
                                                   thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                                   filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                                >Notes</TableHeaderColumn>
                                <TableHeaderColumn dataField='idSt'
                                                   thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                                   dataFormat={(cell,row)=>this.renderButtons(cell,row)}
                                ></TableHeaderColumn>

                            </BootstrapTable>
                        </div>
                    </div>
    );
    }
}

