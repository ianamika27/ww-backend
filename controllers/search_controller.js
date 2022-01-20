// const user_model = require('../models/users_model');

module.exports.search_moviename =  async (req,res) =>{
    //let response = await user_model.login(req.body)
    console.log('returning from backend')
    let response = {
        "status":'success',
        "body":req.body
    }
    res.send(response)
}