export default {
    checkAccess(user){
        if(user === 'ADMIN')                    return ['HOME', 'SETTINGS']
        else if(user === 'TEACHER')             return ['HOME']
        else if(user === 'STUDENT')             return ['HOME']
        else return ['LOGIN']   // user === null => unlogged
    }
}