import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import {Col, Row} from "reactstrap";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import StudentsForm from "./components/StudentsForm";
import StudentsTable from "./components/StudentsTable";
import Utils from "../../app_utilities/Utils";

export default class StudentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            editedObject: null,
            schoolClasses:[],
            schoolClassesForSelect:[],
        };
    }

    componentDidMount() {
        this.loadData();
        this.loadSchoolClasses();
    }

    loadData() {
        let arr = [
            {
                idSt: 1,
                firstname: 'Adam',
                surname: 'Smith',
                personalNumber: '1212121212',
                adress: 'Rzeszow, Poland',
                notes: '',
                idCl: 1,
            },
            {
                idSt: 2,
                firstname: 'Margaret',
                surname: 'Smith',
                personalNumber: '1333333333',
                adress: 'Rzeszow, Poland',
                notes: 'has hearing problems',
                idCl: 1
            },
            {
                idSt: 3,
                firstname: 'Ron',
                surname: 'Tyrell',
                personalNumber: '14422233232',
                adress: 'Krakowska 33, Rzeszow, Poland',
                notes: '',
                idCl: 2
            },
        ]
        this.setState({data: arr})
    }

    loadSchoolClasses(){
        let arr = [
            {
                idCl: 1,
                name: '1A',
                profile: 'Math and IT',
                startYear: 2018,

            },
            {
                idCl: 2,
                name: '1B',
                profile: 'Biology and Chemistry',
                startYear: 2018,

            }
        ]

        this.setState({
            schoolClasses:arr,
            schoolClassesForSelect: Utils.changeTabOfObjectsToSimpleObject(arr,'idCl','name','startYear','profile')
        })
    }

    onClickEdit(obj) {
        this.setState({editedObject: obj, showForm:true})
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
            <NavigationComponent>
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <StudentsForm
                                        handleClickSave={(obj, isEdition) => this.onClickSave(obj, isEdition)}
                                        handleClickCancel={() => {
                                            this.setState({showForm: false, editedObject: null})
                                        }}
                                        editedObject={this.state.editedObject}
                                        schoolClasses={this.state.schoolClasses}
                                    />
                                    :
                                    <div className={'pull-right'}>
                                        <ButtonAdd onClick={() => this.setState({showForm: true})}/>
                                    </div>
                            }
                        </Col>
                        <Col xs={12}>
                            <StudentsTable data={this.state.data}
                                           handleClickEdit={(obj) => this.onClickEdit(obj)}
                                           handleClickDelete={(obj) => this.onClickDelete(obj)}
                                           schoolClasses={this.state.schoolClasses}
                                           schoolClassesForSelect={this.state.schoolClassesForSelect}
                                           disableNumber={true}

                            />
                        </Col>
                    </Row>
                </div>
            </NavigationComponent>
        );
    }
}

