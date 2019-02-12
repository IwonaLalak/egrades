import accessConfig from "../app_access/accessConfig";

export default {

    checkIfUserHasPermission(module) {
        // users: admin, teacher, student

        // todo for now

        let localStorageUser = {id: 1, name: 'Jon X', type: 'ADMIN'}
        if (!Boolean(localStorageUser)) {
            return false
        }
        else {
            return (accessConfig.checkAccess(localStorageUser.type).indexOf(module) > -1)
        }


    }


}