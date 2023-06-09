const User = require("./database/model/user.model");
const Message = require("./database/model/message.model");

function Socket(io) {
  const { clearInterval } = require("timers");
  let interval;

  io.on("connection", (socket) => {
    const user = new User();
    const message = new Message();

    console.log("user connected");
    console.log(socket)
    user.connectedSocket(socket.id, socket.handshake.query.idUser);

    socket.on("newConnection", () => {
      socket.emit("newConnection", "");
      socket.broadcast.emit("newConnection", "");
    });

    socket.on("message", async (e) => {
      if (message.add(e.message, e.idUser, false, 1)) {
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
      if (message.add(e.message, e.idUser, true, 1)) {
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
      clearInterval(interval);
      socket.broadcast.emit("stopWrite", "test");
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
      user.disconnectedSocket(socket.handshake.query.idUser);
      clearInterval(interval);
      socket.emit("disconnection", "");
      socket.broadcast.emit("disconnection", "");
    });
  });

  const peopleWrite = (e) => {
    e.socket.broadcast.emit("write", e.user);
  };
}

module.exports = Socket;
