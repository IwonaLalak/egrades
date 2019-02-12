export default{
    getApplicationLinks(){
        return [
            {id:1, name:'Home', icon:'home', path:'/home', module:'HOME'},
            {id:2, name:'Grades', icon:'graduation-cap', path:'/grades', module:'GRADES'},
            {id:3, name:'Search Student', icon:'search', path:'/student', module:'STUDENT'},
            {id:4, name:'Students', icon:'users', path:'/students', module:'STUDENTS'},
            {id:5, name:'Classes', icon:'bookmark-o', path:'/classes', module:'CLASSES'},
            {id:6, name:'Subjects', icon:'book', path:'/subjects', module:'SUBJECTS'},
            {id:7, name:'Teachers', icon:'user-secret', path:'/teachers', module:'TEACHERS'},
            {id:8, name:'Settings', icon:'cogs', path:'/settings', module:'SETTINGS'},

        ]
    }
}