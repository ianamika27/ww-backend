const movies_model = require('../models/movies');

module.exports.search_moviename =  async (req,res) =>{
    let movies = movies_model.search_moviename()
    
    res.send(movies)
}