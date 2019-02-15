import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import {ButtonAction, ButtonAdd, ButtonDelete, ButtonEdit} from "../../../app_components/ButtonsComponents";
import tabgrid from "../../../app_utilities/for_components/tabgrid";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ReactTooltip from 'react-tooltip'
import {Icon} from "../../../app_components/IconComponent";

export default class StudentGradesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount(){
    }

    renderGrades(cell, row) {
        return (
            <div className={'gradesContainer'}>
                {
                    cell.map(item => {

                        return (
                            <div className={'gradeBox'}>
                                <div data-tip='' data-for={'tooltipGrade_' + item.idGr} data-place="bottom" className='tooltip_here' style={{cursor: 'pointer'}}>
                                <div className={'grade'}>{item.grade}</div>
                                </div>
                                <ReactTooltip id={'tooltipGrade_' + item.idGr}>
                                    <div>
                                        <div><label><Icon type={'calendar'}/>Date: </label>{item.date}</div>
                                        <div><label><Icon type={'user-secret'}/>Teacher: </label>{item.firstname+' '+item.surname}</div>
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
                        <TableHeaderColumn dataField='idSu' isKey hidden={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataSort
                                           thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                           filter={{type: 'TextFilter', delay: 500, placeholder: 'Search'}}
                        >Firstname</TableHeaderColumn>
                        <TableHeaderColumn dataField='grades'
                                           thStyle={tabgrid.tg20} tdStyle={tabgrid.tg20}
                                           dataFormat={(cell, row) => this.renderGrades(cell, row)}
                        >Grades</TableHeaderColumn>

                    </BootstrapTable>
                </div>
            </div>
        );
    }
}

