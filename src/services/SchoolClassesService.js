import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'schoolClasses/'

export default {

    getAllSchoolClasses() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    getSchoolClass(id) {
        return axios({
            method: 'get',
            url: URL+id,
        })
    },

    addSchoolClass(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    editSchoolClass(id,data) {
        return axios({
            method: 'put',
            url: URL+id,
            data: JSON.stringify(data),
        })
    },

    deleteSchoolClass(id) {
        return axios({
            method: 'delete',
            url: URL+id,
        })
    },

}