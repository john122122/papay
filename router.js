const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("You are in Home page");
});

router.get("/menu", function (req, res) {
    res.send("You are in Menu page");
});

router.get("/community", function (req, res) {
    res.send("You are in Community page");
});

module.exports = router;