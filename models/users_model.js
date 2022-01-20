const crypto =  require('crypto')

const config = require('../config/default')
const db_connection = require('../utils/db_connections')


module.exports.login = async (request_body) => {
    let response = {}
    const select_query = "SELECT * FROM users where user_name=? and password=?";
    let encrypt_password = crypto.createHmac("sha256", config['secret']).update(request_body['password']).digest("hex");
    const select_params = [request_body['username'],encrypt_password]
    try{
        query_response = await db_connection.query(select_query,select_params)
        if(query_response.length>0){
            response = request_body
        }
    }
    catch(error){
        console.error(`user_model.login : ${error}`)
    }
    return response
}

module.exports.register = async (request_body) => {
    let response = {}
    let encrypt_password = crypto.createHmac("sha256", config['secret']).update(request_body.password).digest("hex");
    let insert_query = 'INSERT INTO users(create_at,updated_at,user_name,email_address,password,confirm_password,role,active)VALUES(?,?,?,?,?,?,?,?)';
    let insert_params = [new Date(),new Date(),request_body['username'],request_body['emailaddress'],encrypt_password,encrypt_password,'user',true]
    try{
        query_response = await db_connection.query(insert_query,insert_params)
        if(query_response){
            request_body['id'] =query_response.insertId
            response = request_body
        }
        console.info(`SUCCESS - user_model.register - User Registered Successfully!!`)
    }
    catch(error){
        console.error(`ERROR - user_model.register : ${error}`)
        response = error
    }

    return response;
}

module.exports.getAllUsers = async (params) => {
    let response = '';
    const select_query = "SELECT * FROM users";
    try{
        response = await db_connection.query(select_query)
    }
    catch(error){
        console.log(error)
        response = error
    }
    return response
}