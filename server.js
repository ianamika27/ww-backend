var express = require('express');
var cors  =  require('cors')
var app = express();

app.use(cors({origin: 'http://localhost:8080'}));
app.use(express.json({ limit: '50mb' }));

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
var searchRouter =  require('./routes/search_routes')

app.use('/api/v1/users',usersRouter);
app.use('/api/v1/search',searchRouter);


const PORT = process.env.PORT || 9001;

app.listen(PORT,(error)=>{
    if(error){
        return console.log("Error "+error)
    }
    console.log("WorthWatch - Backend listening on port ", PORT);
})


app.get('/testEndpoint', function (req, res) {
    res.send('WorthWatch - Backend running!!');
})