const router = require("express").Router();

const apiAuth = require("./auth");
const apiUser = require("./user");
const apiMessage = require("./message");

router.use("/auth", apiAuth);
router.use("/user", apiUser);
router.use("/message", apiMessage);

module.exports = router;
