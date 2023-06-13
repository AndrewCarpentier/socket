const User = require("./database/model/user.model");
const Message = require("./database/model/message.model");

function Socket(io) {
  const { clearInterval } = require("timers");
  let interval;

  io.on("connection", async (socket) => {
    const user = new User();
    await user.getUserById(socket.handshake.query.idUser);
    console.log("user connected", socket.id);
    user.connectedSocket(socket.id, socket.handshake.query.idUser);

    resetSocketList(user, socket);

    socket.on("newConnection", () => {
      socket.emit("newConnection", "");
      socket.broadcast.emit("newConnection", "");
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

    socket.on("resetChannel", async () => {
      await user.getUserById(socket.handshake.query.idUser);
      resetSocketList(user, socket);
    });
  });

  const peopleWrite = (e) => {
    e.socket.broadcast.emit("write", e.user);
  };

  function resetSocketList(user, socket) {
    const message = new Message();

    user.privateChannelList.forEach((channel) => {
      socket.on(channel.id + "privateMessage", async (e) => {
        console.log(user);
        if (await message.add(e.message, user.id, false, e.idChannel, true)) {
          socket.emit(channel.id + "privateMessage", {
            user: user,
            message: e.message,
            gif: false,
          });
          socket.broadcast.emit(channel.id + "privateMessage", {
            user: user,
            message: e.message,
            gif: false,
          });
        }
      });

      socket.on(channel.id + "privateGif", async (e) => {
        if (message.add(e.message, user.id, true, e.idChannel, true)) {
          socket.emit(channel.id + "privateMessage", {
            user: user,
            message: e.message,
            gif: true,
          });
          socket.broadcast.emit(channel.id + "privateMessage", {
            user: user,
            message: e.message,
            gif: true,
          });
        }
      });
    });
    user.channelList.forEach((channel) => {
      socket.on(channel.id + "message", async (e) => {
        if (await message.add(e.message, user.id, false, e.idChannel, false)) {
          socket.emit(channel.id + "message", {
            user: user,
            message: e.message,
            gif: false,
          });
          socket.broadcast.emit(channel.id + "message", {
            user: user,
            message: e.message,
            gif: false,
          });
        }
      });

      socket.on(channel.id + "gif", async (e) => {
        if (message.add(e.message, user.id, true, e.idChannel, false)) {
          socket.emit(channel.id + "message", {
            user: user,
            message: e.message,
            gif: true,
          });
          socket.broadcast.emit(channel.id + "message", {
            user: user,
            message: e.message,
            gif: true,
          });
        }
      });
    });
  }
}

module.exports = Socket;
