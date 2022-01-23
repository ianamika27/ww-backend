require('dotenv').config({ path: `.env` });
var express = require('express');
var cors  =  require('cors')
var app = express();

app.use(cors({origin: 'http://localhost:8080'}));
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 9001;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization,siteid,sitename,userid,baseurl,accesstoken"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
  
var usersRouter = require('./routes/users_route');
app.use('/api/v1/users',usersRouter);

var searchRouter =  require('./routes/search_routes')
app.use('/api/v1/search',searchRouter);

//To through 404 error
app.use((req, res, next) => {
    const error = new Error('The page you are looking for not found');
    error.status = 404;
    next(error);
});

module.exports = app;