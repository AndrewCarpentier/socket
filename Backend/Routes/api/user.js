const User = require("../../database/model/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, pseudo, password, passwordConfirm } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(email, pseudo, password)
  const user = new User(email, pseudo, hashPassword);
  if (password === passwordConfirm) {
    const x = await user.verifyIfMailAlreadyExist()
    if (!(await user.verifyIfMailAlreadyExist())) {
      if (await user.add()) {
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
