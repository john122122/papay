const express = require("express");
const router_bssr = express.Router(); // expressni ichidan routerni olib chiqayopmiz.
const restaurantController = require("./controllers/restaurantController"); // membercontrollerni chaqirib olayopmiz.

/******************************
 *           BSSR API          *  // TRADITIONAL USul
 ******************************/

// memberga dahldor routerlar

router_bssr
    .get("/signup", restaurantController.getSignupMyRestaurant)// membercontrollerni ichidagi signupga borayopti.
    .post("/signup", restaurantController.signupProcess); // membercontrollerni ichidagi signupga borayopti.

router_bssr
    .get("/login", restaurantController.getLoginMyRestaurant) // membercontrollerni ichidagi loginga borayopti.
    .post("/login", restaurantController.loginProcess); // membercontrollerni ichidagi loginga borayopti.
// router_bssr.get("/logout", restaurantController.logout); // membercontrollerni ichidagi logoutga borayopti.
router_bssr.get("/products/menu", restaurantController.getMyRestaurantData); // membercontrollerni ichidagi logoutga borayopti.
router_bssr.get("/check-me", restaurantController.checkSessions);

//bu faylni expoert qilamiz boshqa faylga.
module.exports = router_bssr;