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

const User = require("./database/model/user.model");
const Message = require("./database/model/message.model");
const { clearInterval } = require("timers");
let interval;

io.on("connection", (socket) => {
  const user = new User();
  const message = new Message();

  console.log("user connected");
  console.log(socket.id);

  socket.on("message", async (e) => {
    if (message.add(e.message, e.idUser, false)) {
      await user.getUserById(e.idUser);
      socket.emit("message", { user: user, message: e.message, gif: false });
      socket.broadcast.emit("message", {
        user: user,
        message: e.message,
        gif: false,
      });
    }
  });

  socket.on("gif", async (e) => {
    if (message.add(e.message, e.idUser, true)) {
      await user.getUserById(e.idUser);
      socket.emit("message", { user: user, message: e.message, gif: true });
      socket.broadcast.emit("message", {
        user: user,
        message: e.message,
        gif: true,
      });
    }
  });

  socket.on("write", async (idUser) => {
    await user.getUserById(idUser);
    console.log(user);
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(
      () => peopleWrite({ socket, user: user.getUserWithoutPassword }),
      500
    );
  });

  socket.on("stopWrite", () => {
    console.log("stop");
    clearInterval(interval);
    socket.broadcast.emit("stopWrite", "test");
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
    clearInterval(interval);
  });
});

const peopleWrite = (e) => {
  e.socket.broadcast.emit("write", e.user);
};

app.use("*", (req, res) => {
  res.status(400).end();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
