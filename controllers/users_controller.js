const user_model = require('../models/users_model');

module.exports.login =  async (req,res) =>{
    let response = await user_model.login(req.body)
    res.send(response)
}

module.exports.register = async (req, res) => {
    let response = await user_model.signup(req.body)
    res.send(response)
}

module.exports.getUser = async (req, res) => {
    let response = await user_model.get_user(req, res)
    res.send(response)
}