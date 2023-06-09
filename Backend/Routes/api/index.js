const router = require("express").Router();

const apiAuth = require("./auth");
const apiUser = require("./user");
const apiMessage = require("./message");
const apiChannel = require("./channel");

router.use("/auth", apiAuth);
router.use("/user", apiUser);
router.use("/message", apiMessage);
router.use("/channel", apiChannel);

module.exports = router;
