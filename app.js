var express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
});





io.on('connection', (socket) => {
  

  socket.on('sendData', (data) => {
    console.log(data)

    socket.join(data.roomName)
/////////////////////////////////////////////////////////////////////////
    socket.on('sendMessage', (messageData) => {
  
      socket.emit('receiveMessage',messageData)

      socket.broadcast.to(data.roomName).emit('receiveMessageBroadcast', {message:messageData.message,owner:false,otherUserName:messageData.userInfo.userName});
    });
  });



  


  socket.on('disconnect', () => {
    console.log('a user disconnected\n');
  });
});





httpServer.listen(3000, () => {
  console.log('listening port:3000\n');
});

