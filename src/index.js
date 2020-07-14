const express = require("express");
const path = require('path');
const SocketIO = require('socket.io');
const http= require('http');

//Inicialization
const app = express();
const server=http.createServer(app);
const io=SocketIO(server);

//App settings
app.set('port', process.env.PORT || 4000);

//static
app.use(express.static(path.join(__dirname,'public')));


//socket
require('./socket')(io);

//Starting Server
server.listen(app.get('port'),()=>{
    console.log("Server on port",app.get('port'));
})

