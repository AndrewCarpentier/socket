const bodyParser = require("body-parser");
const express = require("express");
const cookie = require("cookie-parser");
const routes = require("./Routes");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

require('./database');
const cors = require("cors");
const port = 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookie());

app.use(bodyParser.json());

app.use(routes);

app.use('*', (req, res)=>{
  res.status(400).end();
})

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id)

  socket.on("message", (msg) => {
    console.log(msg)
    socket.emit("message", msg);
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

// Lancement du serveur Node.js
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});