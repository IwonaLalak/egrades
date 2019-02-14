import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'teachers/'

export default {

    getAllTeachers() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getTeacher(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    addTeacher(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editTeacher(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteTeacher(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

}