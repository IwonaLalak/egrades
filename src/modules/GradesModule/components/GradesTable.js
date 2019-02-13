import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonAdd, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class GradesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderButtons(cell, row) {
        return (<div>
            <ButtonAdd onClick={() => {
                this.props.handleClickAddGrade(row)
            }} outline={true} disabled={(!this.props.semester.isCurrent)}/>
                {
                    !this.props.semester.isCurrent?
                        <div style={{color:'grey', fontSize:'10px',fontStyle:'italic'}}>The archival semester has been selected - you can not write a grade.</div>
                        :
                        ''
                }
            </div>
        )
    }

    renderGrades(cell, row) {
        return (
            <div className={'gradesContainer'}>
                {
                    cell.map(item => {
                        return (
                            <div className={'gradeBox'}>
                                <div className={'grade'}>{item.grade}</div>
                                <div className={'date'}>{item.date}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {

        return (
            <div id={'GradesTable'}>
                <div>
                    <BootstrapTable data={this.props.data}
                                    pagination
                                    hover
                    >
                        <TableHeaderColumn dataField='idSt' isKey hidden={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='firstname' dataSort
                                           thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                           filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                        >Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='surname' dataSort
                                           thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                           filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                        >Surname</TableHeaderColumn>
                        <TableHeaderColumn dataField='grades'
                                           thStyle={tabgrid.tg16} tdStyle={tabgrid.tg16}
                                           dataFormat={(cell, row) => this.renderGrades(cell, row)}
                        >Grades</TableHeaderColumn>
                        <TableHeaderColumn dataField='idSt'
                                           thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                           dataFormat={(cell, row) => this.renderButtons(cell, row)}
                        ></TableHeaderColumn>

                    </BootstrapTable>
                </div>
            </div>
        );
    }
}

