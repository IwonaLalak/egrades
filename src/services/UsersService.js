import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'user/'


export default {

    getAllUsers() {
        return axios({
            method: 'get',
            url: URL,
        })
    },

    changeUser(id, data) {
        return axios({
            method: 'put',
            url: URL + id,
            data: JSON.stringify(data),
        })
    },
}