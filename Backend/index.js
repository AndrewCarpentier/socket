const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const port = 8000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const Socket = require('./socket');
Socket(io);

require("./database");
const routes = require("./Routes");
const cors = require("cors");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());

app.use(bodyParser.json());

app.use(routes);

app.use("*", (req, res) => {
  res.status(400).end();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
