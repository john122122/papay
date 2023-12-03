const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController=require("./controllers/productController"); 

/**********************************
 *          REST API              *
 *********************************/

// Member related routers
router.post("/sign-up", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
    "/member/:id", 
    memberController.retrieveAuthMember,
    memberController.getChosenMember);

// Product related roters
router.post("/products", memberController.retrieveAuthMember, // bizni kimligimizni aniqlaydi.
productController.getAllProducts ); //barcha restar mahsulotlarini bitta qilib qyozish.


module.exports = router;