const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController"); 
const restaurantController = require("./controllers/restaurantController");
const orderController = require("./controllers/orderController");

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
router.post(
    "/products", 
    memberController.retrieveAuthMember,     // bizni kimligimizni aniqlaydi.
    productController.getAllProducts 
);                                           //barcha restar mahsulotlarini bitta qilib qyozish.
router.get(
    "/products/:id",
    memberController.retrieveAuthMember,
    productController.getChosenProduct
);

// Restaurant related routers
router.get(
    "/restaurants", 
    memberController.retrieveAuthMember,
    restaurantController.getRestaurants
);

router.get(
    "/restaurants/:id",
    memberController.retrieveAuthMember,
    restaurantController.getChosenRestaurant
);

// Order related routers

router.post(
    "/orders/create", 
    memberController.retrieveAuthMember, 
    orderController.createOrder
);


module.exports = router;