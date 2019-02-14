import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'grades/'

export default {

    getAllGrades() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getGrade(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    addGrade(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editGrade(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteGrade(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

    getAllStudentsAndGradesForSemesterClassAndSubject(params){
        return axios({
            method: 'get',
            url: AppConfig.HOST_API() +'studentGrades/findAllByCriteria'+params,
        })
    },

    getAllStudentGradesForSemester(params){
        return axios({
            method: 'get',
            url: AppConfig.HOST_API() +'studentGradesTeacher/findAllByCriteria'+params,
        })
    },



}