const user_model = require('../models/users_model');

module.exports.login =  async (req,res) =>{
    let response = await user_model.login(req.body)
    res.send(response)
}

module.exports.register = async (req, res) => {
    
    let all_users = await user_model.register(req.body)
    res.send(all_users)
}