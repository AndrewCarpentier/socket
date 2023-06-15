const User = require("./database/model/user.model");
const Message = require("./database/model/message.model");

function Socket(io) {
  const { clearInterval } = require("timers");
  let interval;

  io.on("connection", async (socket) => {
    const user = new User();
    await user.getUserById(socket.handshake.query.idUser);
    console.log(user.pseudo + " connected", socket.id);
    user.connectedSocket(socket.id, socket.handshake.query.idUser);

    initSocketList(user, socket);

    socket.on("newConnection", () => {
      socket.emit("newConnection", "");
      socket.broadcast.emit("newConnection", "");
    });

    socket.on("write", async (idUser) => {
      await user.getUserById(idUser);
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
      console.log(user.pseudo + " disconnect");
      user.disconnectedSocket(socket.handshake.query.idUser);
      clearInterval(interval);
      socket.emit("disconnection", "");
      socket.broadcast.emit("disconnection", "");
    });

    socket.on("addNewChannel", async (e) => {
      console.log(e);
      await user.getUserById(socket.handshake.query.idUser);
      if (e.private) {
        addNewPrivateChannel(socket, e.channelId, user);
      } else {
        addNewChannel(socket, e.channelId, user);
      }
    });
  });

  const peopleWrite = (e) => {
    e.socket.broadcast.emit("write", e.user);
  };

  function addNewChannel(socket, channelId, user) {
    const message = new Message();
    socket.on(channelId + "message", async (e) => {
      console.log(e)
      if (await message.add(e.message, user.id, false, e.idChannel, false)) {
        socket.emit(channelId + "message", {
          user: user,
          message: e.message,
          gif: false,
        });
        socket.broadcast.emit(channelId + "message", {
          user: user,
          message: e.message,
          gif: false,
        });
      }
    });

    socket.on(channelId + "gif", async (e) => {
      console.log(e)

      if (message.add(e.message, user.id, true, e.idChannel, false)) {
        socket.emit(channelId + "message", {
          user: user,
          message: e.message,
          gif: true,
        });
        socket.broadcast.emit(channelId + "message", {
          user: user,
          message: e.message,
          gif: true,
        });
      }
    });
  }

  function addNewPrivateChannel(socket, channelId, user) {
    const message = new Message();

    socket.on(channelId + "privateMessage", async (e) => {
      if (await message.add(e.message, user.id, false, e.idChannel, true)) {
        socket.emit(channelId + "privateMessage", {
          user: user,
          message: e.message,
          gif: false,
        });
        socket.broadcast.emit(channelId + "privateMessage", {
          user: user,
          message: e.message,
          gif: false,
        });
      }
    });

    socket.on(channelId + "privateGif", async (e) => {
      if (message.add(e.message, user.id, true, e.idChannel, true)) {
        socket.emit(channelId + "privateMessage", {
          user: user,
          message: e.message,
          gif: true,
        });
        socket.broadcast.emit(channelId + "privateMessage", {
          user: user,
          message: e.message,
          gif: true,
        });
      }
    });
  }

  function initSocketList(user, socket) {
    const message = new Message();

    user.privateChannelList.forEach((channel) => {
      socket.on(channel.id + "privateMessage", async (e) => {
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
