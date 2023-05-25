const User = require("../../database/model/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, pseudo, password, passwordConfirm } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User();
  if (password === passwordConfirm) {
    if (!(await user.verifyIfMailAlreadyExist(email))) {
      if (await user.add(email, pseudo, hashPassword)) {
        res.json(true);
      } else {
        res.json(false);
      }
    } else {
      res.json(false);
    }
  } else {
    res.json(false);
  }
});

module.exports = router;
