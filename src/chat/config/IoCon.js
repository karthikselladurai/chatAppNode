const server= require('../../../index')
const socket = require('socket.io')
const logger = require('../../services/logger')
const io = socket(server)


io.on("connection", function(socket){
    logger.info({status: "success", message:"socket connection"})
    console.log("io");
})
