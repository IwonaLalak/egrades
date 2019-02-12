export default{

    changeTabOfObjectsToSimpleObject(data, idLabel, nameLabel1, nameLabel2, nameLabel3) {
        let obj = {};
        let temporary;

        for (let value of data) {
            temporary = {[value[idLabel]]: Boolean(nameLabel3 !== null) ? (value[nameLabel1] +' '+ value[nameLabel2] + ' - ' + value[nameLabel3]) : Boolean(nameLabel2 !== null) ? (value[nameLabel1] + ' - ' + value[nameLabel2]) : value[nameLabel1]}
            obj = Object.assign(obj, temporary)
        }

        return (obj)
    }

}