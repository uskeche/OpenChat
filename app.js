const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname,'pages/css')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'pages/html/login.html'));
});


app.get('/chatroom', (req, res) => {

  const userName = req.params;
  console.log(userName)
  res.sendFile(path.join(__dirname,'pages/html/chatroom.html'));
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    socket.emit('chat message',msg)
    socket.broadcast.emit('chat message', {message:msg.message,owner:false});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening port:3000');
});

