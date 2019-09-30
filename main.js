'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const POST = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("setUserName", (userName) => {
    socket.userName = userName;
  })
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", socket.userName + " : " + msg);
  });
});

http.listen(POST, () => {
  console.log(`${POST} connected`);
});
