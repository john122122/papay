const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

// memberga dahildor routerlar
router.get("/", memberController.home);
router.post("/singup", memberController.singup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


// boshqa routerlar
router.get("/menu", function (req, res) {
    res.send("You are in Menu page");
});

router.get("/community", function (req, res) {
    res.send("You are in Community page");
});

module.exports = router;