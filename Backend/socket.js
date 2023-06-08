const User = require("./database/model/user.model");
const Message = require("./database/model/message.model");

function Socket(io) {
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
}

module.exports = Socket;
