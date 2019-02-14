import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'students/'

export default {

    getAllStudents() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getStudent(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    getStudentsInClass(idCl) {
        return axios({
            method: 'get',
            url: URL+'bySchoolClassId/'+idCl,
        })
    },

    addStudent(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editStudent(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteStudent(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

}