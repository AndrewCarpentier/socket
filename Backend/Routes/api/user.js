const User = require("../../database/model/user.model");
const Channel = require("../../database/model/channel.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, pseudo, img, password, passwordConfirm } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(email, pseudo, hashPassword)
  const user = new User();
  if (password === passwordConfirm) {
    if (!(await user.verifyIfMailAlreadyExist(email))) {
      if (!(await user.verifyIfPseudoAlreadyExist(pseudo))) {
        if (await user.add(email, pseudo, img, hashPassword)) {
          Channel.addUserInChannel(user.id, 1);
          res.json(true);
        } else {
          res.status(400).json("API error");
        }
      } else {
        res.status(400).json("This pseudo already exist");
      }
    } else {
      res.status(400).json("This mail already exist");
    }
  } else {
    res.status(400).json("Password and password confirm need to be same");
  }
});

router.get("/getUsersByChannelId/:idChannel", async (req, res) => {
  const { idChannel } = req.params;
  const { private } = req.query;
  if (private === "true") {
    res.json(await User.getUsersByPrivateChannelId(idChannel));
  } else {
    res.json(await User.getUsersByChannelId(idChannel));
  }
});

router.get("/getUserById/:id", async(req, res)=>{
  const {id} = req.params;
  const user = new User();
  await user.getUserById(id);
  res.json(user);
})

module.exports = router;
