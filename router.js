const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

/**********************************
 *          REST API              *
 *********************************/

// memberga oid routerlar
router.post("/sign-up", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
    "/member/:id", 
    memberController.retrieveAuthMember,
    memberController.getChosenMember);

// boshqa routerlar
router.get("/menu", (req, res) => {
    res.send("You are in Menu");
});
router.get("/community", (req, res) => {
    res.send("You are in Community");
});

module.exports = router;