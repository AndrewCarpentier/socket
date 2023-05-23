const router = require("express").Router();
const User = require("../../database/model/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, "", password);
  await user.getUserByMail();
  if (user.id !== 0) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jsonwebtoken.sign({}, key, {
        subject: user.id.toString(),
        expiresIn: 3600 * 24 * 31 * 12,
        algorithm: "RS256",
      });
      res.cookie("auth", token, {
        sameSite: "none",
        httpOnly: "true",
        secure: "false",
      });
      res.json(user.getUserWithoutPassword);
    } else {
      res.json("Email et/ou mot de passe incorrect");
    }
  } else {
    res.json("Email et/ou mot de passe incorrect");
  }
});

router.delete("/", (req, res) => {
    res.clearCookie("auth", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.end();
  });

module.exports = router;
