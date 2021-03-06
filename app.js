require('dotenv').config({ path: `.env` });

const cors  =  require('cors');
const express = require('express');
const passport = require('passport');
const mustacheExpress = require('mustache-express');


require('./config/passport/jwt.setup');
require('./config/passport/local.setup');
require('./config/passport/google.setup');
require('./config/passport/facebook.setup');

var app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json({ limit: '50mb' }));
app.engine('html', mustacheExpress());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
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
  
// const usersRouter = require('./routes/users_route');
// app.use('/api/v1/users',usersRouter);

const authRouter = require('./routes/Auth')
app.use('/api/v1/auth',authRouter);

// const UserController = require('./controllers/User')
// app.use('/api/user',UserController)

//To through 404 error
app.use((req, res, next) => {
    console.log(req)
    const error = new Error('The page you are looking for not found');
    error.status = 404;
    next(error);
});

module.exports = app;