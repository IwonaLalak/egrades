import accessConfig from "../app_access/accessConfig";
import axios from 'axios';
import AppConfig from "../app_config/AppConfig";

let URL = AppConfig.HOST_API() + 'access/'


export default {

    getLoggedUser() {
        if (Boolean(JSON.parse(localStorage.getItem('egrades_currentuser')))) {
            return JSON.parse(localStorage.getItem('egrades_currentuser'))
        } else return null
    },

    checkIfUserIsLogged() {
        return Boolean(JSON.parse(localStorage.getItem('egrades_currentuser')))
    },

    checkIfUserHasPermission(module) {
        // users: admin, teacher, student

        // todo for now

        let localStorageUser = JSON.parse(localStorage.getItem('egrades_currentuser'))
        if (!Boolean(localStorageUser)) {
            return false
        }
        else {
            return (accessConfig.checkAccess(localStorageUser.typ).indexOf(module) > -1)
        }


    },

    checkIfADMIN(){
        return this.getLoggedUser().typ === 'ADMIN'
    },

    checkIfTEACHER(){
        return this.getLoggedUser().typ === 'TEACHER'
    },

    checkIfSTUDENT(){
        return this.getLoggedUser().typ === 'STUDENT'
    },

    setUserLogged(user, token) {
        localStorage.setItem('egrades_currentuser', JSON.stringify(user))
        axios.defaults.headers.common.Authorization = token;
    },

    loginUser(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data),
        })
    },

    registerUser(data) {
        return axios({
            method: 'post',
            url: URL + 'register?userTypeName='+data.userTypeName+'&typId='+data.typeId,
            data: JSON.stringify(data),
        })
    },

    logOut(){
        localStorage.removeItem('egrades_currentuser')
    }

}