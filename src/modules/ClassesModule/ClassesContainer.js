import React, {Component} from 'react';
import NavigationComponent from "../../app_components/complex/navigationComponent/NavigationComponent";
import ClassesTable from "./components/ClassesTable";
import {Col, Row} from "reactstrap";
import ClassesForm from "./components/ClassesForm";
import {ButtonAdd} from "../../app_components/ButtonsComponents";
import ModalComponent from "../../app_components/complex/modalComponent/ModalComponent";
import StudentsTable from "../StudentsModule/components/StudentsTable";
import Utils from "../../app_utilities/Utils";

export default class ClassesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            data: [],
            schoolClassesForSelect: [],
            editedObject: null,
            showModal:false,
            dataForModal:null
        };
    }

    componentDidMount() {
        // todo: popup with students in particular class
        this.loadData();
    }

    loadData() {
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
            data: arr,
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

    onClickShowStudents(obj){
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
        ]

        this.setState({
            showModal:true,
            dataForModal:[obj,arr]
        })
    }

    render() {

        return (
            <NavigationComponent>
                <div>
                    <Row>
                        <Col xs={12}>
                            {
                                this.state.showForm ?
                                    <ClassesForm
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
                            <ClassesTable data={this.state.data}
                                          handleClickEdit={(obj) => this.onClickEdit(obj)}
                                          handleClickDelete={(obj) => this.onClickDelete(obj)}
                                          handleClickShowStudents={(obj) => this.onClickShowStudents(obj)}

                            />
                        </Col>
                    </Row>
                </div>
                {
                    (Boolean(this.state.dataForModal) && this.state.showModal)?
                        <ModalComponent handleClickCancel={()=>{this.setState({showNodal:false, dataForModal:null})}}
                                        title={'Students in '+ this.state.dataForModal[0].name
                                        +' - '+this.state.dataForModal[0].profile+', '+this.state.dataForModal[0].startYear
                        }>
                            <div>
                                <StudentsTable
                                    data={this.state.dataForModal[1]}
                                    schoolClasses={this.state.data}
                                    schoolClassesForSelect={this.state.schoolClassesForSelect}
                                    disableButtons={true}

                                />
                            </div>
                        </ModalComponent>
                        :
                        ''
                }

            </NavigationComponent>
        );
    }
}

