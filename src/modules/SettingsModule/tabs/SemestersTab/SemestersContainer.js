import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {ButtonAdd} from "../../../../app_components/ButtonsComponents";
import SemestersTable from "./components/SemestersTable";
import SemestersForm from "./components/SemestersForm";

export default class SemestersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            editedObject: null
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let arr = [
            {
                idSe: 1,
                dateSince: '2018-09-01',
                dateTo: '2019-02-28',
                name: '2018/2019 winter',
                isCurrent:true,
            },
            {
                idSe: 2,
                dateSince: '2018-03-01',
                dateTo: '2019-06-30',
                name: '2018/2019 summer',
                isCurrent:false,
            }
        ]
        this.setState({data: arr})
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm: true})
    }

    onClickDelete(obj) {
        // rest
    }

    onClickSave(obj, isEdition) {
        console.log(obj)
        if (isEdition) {
            // rest put
        } else {
            // rest post
        }

        this.setState({showForm: false, editedObject: null})
    }

    render() {

        return (
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <SemestersForm
                                        handleClickSave={(obj, isEdition) => this.onClickSave(obj, isEdition)}
                                        handleClickCancel={() => {
                                            this.setState({showForm: false, editedObject: null})
                                        }}
                                        editedObject={this.state.editedObject}
                                    />
                                    :
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => this.setState({showForm: true})}/>
                                    </div>
                            }
                        </Col>
                        <Col xs={12}>
                            <SemestersTable data={this.state.data}
                                           handleClickEdit={(obj) => this.onClickEdit(obj)}
                                           handleClickDelete={(obj) => this.onClickDelete(obj)}

                            />
                        </Col>
                    </Row>
                </div>
        );
    }
}
