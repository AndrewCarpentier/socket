const User = require("../../database/model/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, pseudo, password, passwordConfirm } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User();
  if (password === passwordConfirm) {
    if (!(await user.verifyIfMailAlreadyExist(email))) {
      if (!(await user.verifyIfPseudoAlreadyExist(pseudo))) {
        if (await user.add(email, pseudo, hashPassword)) {
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

module.exports = router;
