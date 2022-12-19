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
const { InMemorySessionStore } = require('../app/src/chat/sessionStore');
const sessionStore = new InMemorySessionStore();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(express.cookieParser());
// app.use(express.session());
// user.sync({force:true})

require('../app/src/config/DBcon')

// sample.sample()

// require('../chatBotNode/src/chat/IoCon') 
app.use('/api/user', commanRoute)
app.use('/api/user/chat', chatRoute)
app.use(express.static("public"));
// const server= require('../../index') 
let io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true
  }
})
// const logger = require('../services/logger')


  io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth;

  if (!username && username != {}) {
    console.log("invalid username");
    return next(new Error("invalid username"));
  }
  // create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;

  next();
})
// require('../app/src/chat/sessionStore')
io.on("connection", (socket) => {

  let startTime = moment().format('HH:mm:ss')
  logger.info({ status: "success", message: "socket connection", time: startTime })

  console.log(socket.sessionID);
  // ioMiddleWare(socket)
  // persist session
  console.log(socket.username);
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username
    ,
    connected: true,
  });
  // emit session details
  socket.emit("session", {
    username: socket.username,
    sessionID: socket.sessionID,
    userID: socket.userID,
  });
  // join the "userID" room
  socket.join(socket.userID);
  // fetch existing users
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    console.log("session",session);
    users.push({
      username: session.username,
      userID: session.userID,
      connected: session.connected,
    });
  });
  console.log(users);
  socket.emit("users", users);
  socket.on('private message', (data) => {
    logger.info({ from: data.from, to: data.to, content: data.content })
    io.to(data.to).emit('private message', { content:data.content });
  });
})
//  });


http.listen(PORT, () => {
  console.log(`app running on  **************************************************** http://localhost:${PORT}`);
})
module.exports = {
}