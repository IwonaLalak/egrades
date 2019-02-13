import React, {Component} from 'react';
import {Col, Form, FormGroup, Label, Row} from "reactstrap";
import {ButtonAction} from "../../../app_components/ButtonsComponents";
import {LabelMargin, Req} from "../../../app_components/FormsSmallComponents";
import Select from "react-select";
import {Icon} from "../../../app_components/IconComponent";

export default class GradesSearchbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolClass: null,
            semester: null,
            subject: null
        };
    }

    componentDidMount() {
        if (!this.state.semester)
            this.setState({
                semester: this.props.semesters.find(s => Boolean(s.isCurrent))
            })
    }

    componentWillReceiveProps(nextprops) {
        if (!this.state.semester)
            this.setState({
                semester: nextprops.semesters.find(s => Boolean(s.isCurrent))
            })
    }

    onClickSearch() {
        if (Boolean(this.state.schoolClass) && Boolean(this.state.semester) && Boolean(this.state.subject)) {
            this.props.handleClickSearch(
                {
                    idCl: this.state.schoolClass.idCl,
                    idSu: this.state.subject.idSu,
                    idSe: this.state.semester.idSe,
                }
            )
        }
        else {
            alert('Please fill all required selects')
        }
    }

    renderSchoolClass(option) {
        return (
            <div>
                <span className={'badge badge-secondary'}>{option.name}</span> - {option.profile + ', ' + option.startYear}
            </div>
        )
    }

    renderSemester(option) {
        return (<div>
            <span className={'badge badge-secondary'}>{option.name}</span> {option.dateSince + ' - ' + option.dateTo}
            <div className={'pull-right'}>
                {
                    option.isCurrent ?
                        <Icon type={'check'} style={{color: 'forestgreen'}}/>
                        :
                        <Icon type={'times'} style={{color: 'grey'}}/>
                }
            </div>
        </div>)
    }

    renderSubject(option) {
        return option.name
    }


    render() {

        return (
            <div>
                <Form>
                    <h6>Search grades from particular class, subject and semester</h6>
                    <FormGroup row>
                        <Col xs={3}>
                            <Label>Semester<Req/></Label>
                            <Select options={this.props.semesters}
                                    value={this.state.semester}
                                    formatValueLabel={this.renderSemester}
                                    formatOptionLabel={this.renderSemester}
                                    onChange={(e) => {
                                        this.setState({semester: e})
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={2}>
                            <Label>Subject<Req/></Label>
                            <Select options={this.props.subjects}
                                    value={this.state.subject}
                                    formatValueLabel={this.renderSubject}
                                    formatOptionLabel={this.renderSubject}
                                    onChange={(e) => {
                                        this.setState({subject: e})
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={4}>
                            <Label>Class<Req/></Label>
                            <Select options={this.props.schoolClasses}
                                    value={this.state.schoolClass}
                                    formatValueLabel={this.renderSchoolClass}
                                    formatOptionLabel={this.renderSchoolClass}
                                    onChange={(e) => {
                                        this.setState({schoolClass: e})
                                    }}
                                    clearable={false}
                            />
                        </Col>
                        <Col xs={3}>
                            <LabelMargin/>
                            <ButtonAction onClick={() => {
                                this.onClickSearch()
                            }} label={'Search grades'}/>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

