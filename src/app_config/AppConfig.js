export default class AppConfig{

    static APP_NAME(){
        return 'e-grades'
    }

    static APP_VER(){
        return 'v1.0'
    }

    static APP_UPDATE(){
        return '2019-02-11'
    }

    static HOST_API() {
        return window.location.protocol + '/api'
    }
}