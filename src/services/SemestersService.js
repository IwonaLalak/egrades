import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'semesters/'

export default {

    getAllSemesters() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getSemester(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    addSemester(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editSemester(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteSemester(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

}