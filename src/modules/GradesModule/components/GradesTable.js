import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonAdd, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ReactTooltip from 'react-tooltip'
import {Icon} from "../../../app_components/IconComponent";
import LoginService from "../../../services/LoginService";

export default class GradesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderButtons(cell, row) {
        return (<div>
                <ButtonAdd onClick={() => {
                    this.props.handleClickAddGrade(row)
                }} outline={true} disabled={(!this.props.semester.isCurrent) || !LoginService.checkIfTEACHER()} size={'sm'}/>
                {
                    !this.props.semester.isCurrent ?
                        <div style={{color: 'grey', fontSize: '10px', fontStyle: 'italic'}}>The archival semester has been selected - you can not
                            write a grade.</div>
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

                        let teacher = this.props.teachers.find(t => t.idTe === item.idTe)

                        return (
                            <div className={'gradeBox'}>
                                <div data-tip='' data-for={'tooltipGrade_' + item.idGr} data-place="bottom" className='tooltip_here'
                                     style={{cursor: 'pointer'}}>
                                    <div className={'grade'}>{item.grade}</div>
                                </div>
                                <ReactTooltip id={'tooltipGrade_' + item.idGr}>
                                    <div>
                                        <div><label><Icon type={'calendar'}/>Date: </label>{item.date}</div>
                                        {
                                            (Boolean(teacher)) ?
                                                <div><label><Icon type={'user-secret'}/>Teacher: </label>{teacher.firstname + ' ' + teacher.surname}
                                                </div>
                                                :
                                                ''
                                        }
                                    </div>
                                </ReactTooltip>
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

