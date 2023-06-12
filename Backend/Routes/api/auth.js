const router = require("express").Router();
const User = require("../../database/model/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = new User();
  await user.getUserByMail(email);
  if (user.id !== 0) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jsonwebtoken.sign({}, key, {
        subject: user.id.toString(),
        expiresIn: 3600 * 24 * 31 * 12,
        algorithm: "RS256",
      });
      res.cookie("auth", token);
      res.json(user.getUserWithoutPassword);
    } else {
      res.status(400).json("Email et/ou mot de passe incorrect");
    }
  } else {
    res.status(400).json("Email et/ou mot de passe incorrect");
  }
});

router.get("/current", async (req, res) => {
  const { auth } = req.cookies;
  if (auth) {
    const decodedToken = jsonwebtoken.verify(auth, keyPub);
    const user = new User();
    await user.getUserById(decodedToken.sub);
    if (user.id > 0) {
      res.json(user);
    } else {
      res.json(null);
    }
  } else {
    res.json(null);
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
