const express = require('express');
const logger = require('../chatAppNode/src/services/logger')
const app = express();
const commonRoute = require('./src/user/commonRoutes')
const chatRoute = require('./src/chat/chatRoutes')
const productRouter = require('./src/products/router')
var http = require('http').Server(app);
const cors = require('cors')
require('dotenv').config()
let PORT = process.env.PORT | 4000
const user = require('./src/user/model/model')
const  chatList = require('./src/chat/model/chatList')
let sample = require('./src/user/controller/controller')
const moment = require('moment');
const { start } = require('repl');
const { InMemorySessionStore } = require('../chatAppNode/src/chat/sessionStore');
const sessionStore = new InMemorySessionStore();
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { InMemoryMessageStore } = require('../chatAppNode/src/chat/messageStore');
const { Socket } = require('socket.io');
const messageStore = new InMemoryMessageStore();
const postRoute = require('./src/addPost/router');
const postModel =require('./src/addPost/model')

// const WebSocket = require('ws');
// const Stomp = require("stompjs");
// let SockJS = require("sockjs-client");
//   SockJS = new SockJS("http://localhost:8080/ws");
//  const stompClient = Stomp.over(SockJS);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(express.cookieParser());
// app.use(express.session());
// user.sync({force: true})
// chatList.sync({alter: true})
// productItems.sync({alter: true});
// postModel.sync({alter: true})

require('../chatAppNode/src/config/DBcon')

// sample.sample()

// require('../chatBotNode/src/chat/IoCon') 
app.use('/api/user', commonRoute)
app.use('/api/user/post',postRoute)
app.use('/api/user/chat', chatRoute)
app.use('/api/user/product',productRouter)
app.use(express.static("public"));


// Web Socket

// async function sample1(){
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>connect");
//  try{
//   await stompClient.connect({}, onConnected(), onError());
// }catch(err){
//   console.log(err);
// }
// };
// sample1();
// async function onConnected(){ 
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> connected");
//   // console.log(currentUser);
//   //  await stompClient.subscribe(
//   //   "/user/" + "/queue/messages"
//   // );
//   // stompClient.send("/app/chat", {}, JSON.stringify(message));
// };
// async function onError(err) {
//   console.log("error",err);
// }

// const socket1 = new WebSocket("http://localhost:8080/ws");



// stompClient.send("/app/chat", {}, JSON.stringify("hiiii kdm"));

// const server= require('../../index') 
let io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
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
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
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
  socket.join('my-group');
  socket.on('private message', (data) => {
    const message = {
      content:data.content  ,
      from: socket.userID,
      to:data.to,
    }
    logger.info({ from: data.from, to: data.to, content: data.content })
    io.to(data.to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
  });
})
//  });


http.listen(PORT, () => {
  logger.info(`app running on  **************************************************** http://localhost:${PORT}`)
  console.log(`app running on  **************************************************** http://localhost:${PORT}`);
})
module.exports = {
}