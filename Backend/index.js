const bodyParser = require("body-parser");
const express = require("express");
const cookie = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const port = 8000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

require('./database');
const routes = require('./Routes');
const cors = require('cors')

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

const User = require('./database/model/user.model');
const Message = require('./database/model/message.model');

io.on("connection", (socket) => {
  const user = new User();
  const message = new Message();

  console.log("user connected");
  console.log(socket.id)

  socket.on("message", async(e) => {
    if(message.add(e.message, e.idUser)){
      await user.getUserById(e.idUser); 
      socket.emit("message", {user : user, message : e.message});
      socket.broadcast.emit("message", {pseudo : "andrew", message : e.message});
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
  
});

app.use('*', (req, res)=>{
  res.status(400).end();
})

server.listen(port, () => console.log(`Listening on port ${port}`));
