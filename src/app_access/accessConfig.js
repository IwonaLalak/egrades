export default {
    checkAccess(user){
        if(user === 'ADMIN')                    return ['HOME','CLASSES', 'GRADES','SETTINGS', 'STUDENT', 'STUDENTS', 'SUBJECTS','TEACHERS']
        else if(user === 'TEACHER')             return ['HOME','CLASSES', 'GRADES', 'STUDENT', 'STUDENTS']
        else if(user === 'STUDENT')             return ['HOME']
        else return ['LOGIN']   // user === null => unlogged
    }
}