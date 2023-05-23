const router = require("express").Router();

const apiAuth = require("./auth");
const apiUser = require("./user");

router.use("/auth", apiAuth);
router.use("/user", apiUser);

module.exports = router;
