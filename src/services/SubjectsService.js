import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'subject/'

export default {

    getAllSubjects() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getSubject(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    addSubject(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editSubject(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteSubject(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

}