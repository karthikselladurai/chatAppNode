const express = require('express');
const logger = require('../app/src/services/logger')
const app = express();
const commanRoute = require('./src/routes/commonRoutes')
const chatRoute = require('./src/chat/chatRoutes/chatRoutes')
var http = require('http').Server(app);
const cors = require('cors')
require('dotenv').config()
let PORT = process.env.PORT | 4000
const user = require('../app/src/model/model')
let sample = require('./src/controller/controler')
const moment = require('moment');
const { start } = require('repl');


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());
// user.sync({force:true})

require('../app/src/config/DBcon')

// sample.sample()

// require('../chatBotNode/src/chat/IoCon') 
app.use('/api/user',commanRoute)
app.use('/api/user/chat',chatRoute)
app.use(express.static("public"));
// const server= require('../../index') 
let io = require('socket.io')(http,{
    cors: {
      origin: "http://localhost:4200",  
      credentials: true
    }
  })
// const logger = require('../services/logger')

io.on("connection", (socket)=>{
    let startTime = moment().format('HH:mm:ss')
    logger.info({status: "success", message:"socket connection",time:startTime})

    // socket.on('disconnect', function () {    
    //     console.log('A user disconnected');
    //  });
    socket.on('message', (data) => {
      console.log(data);
      io.emit('new-message',data.msg)
        // io.to(data.id).emit('new-message',{id:data.id,msg:data.msg});
       });
})
http.listen(PORT,()=>{
    console.log(`app running on  **************************************************** http://localhost:${PORT}`);
})

module.exports = {
}