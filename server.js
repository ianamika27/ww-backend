const http = require("http");
const app = require('./app')

const dbconnection = require('./utils/connections');

dbconnection.connect();

const PORT = process.env.PORT || 9001;

const server = http.createServer(app).listen(PORT);
console.log(`WorthWatch Backend Server Running on PORT ${PORT}`);
