const router = require("express").Router();
const Channel = require("../../database/model/channel.model");
const User = require("../../database/model/user.model");

router.get("/getChannelById/:id", async (req, res) => {
  const { id } = req.params;
  const channel = new Channel();
  await channel.getChannelInformationById(id);
  channel.users = await User.getUsersByChannelId(id);
  res.json(channel);
});

router.get("/getChannelsByIdUser/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const channels = await Channel.getChannelsByIdUser(idUser);
  res.json(channels);
});

router.get("/getPrivateChannel/:idUser/:idUserSend", async (req, res) => {
  const { idUser, idUserSend } = req.params;
  if (idUser === idUserSend) {
    res.status(400).json("Error idUser == idUser");
  }
  const channel = new Channel();
  const channelExist = await Channel.verifyPrivateMessageChannelExist(
    idUser,
    idUserSend
  );
  if (channelExist) {
    await channel.getPrivateChannel(idUser, idUserSend);
    res.json(channel);
  } else {
    if (await Channel.addPrivateChannel(idUser, idUserSend)) {
      await channel.getPrivateChannel(idUser, idUserSend);
      res.json(channel);
    } else {
      res.json("Error api");
    }
  }
});

router.post("/create", async (req, res) => {
  const { name, idUser } = req.body;
  if (await Channel.verifyChannelExist(name)) {
    res.status(400).json("This channel name already exist");
  } else {
    res.json(await Channel.addChannel(name, idUser));
  }
});

module.exports = router;
