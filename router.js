const express = require("express");
const router = express.Router(); // expressni ichidan routerni olib chiqayopmiz.
const memberController = require("./controllers/memberController"); // membercontrollerni chaqirib olayopmiz.

/******************************
*           REST API          * // ZAMONAVIY USUL
******************************/

// memberga dahldor routerlar
router.post("/signup", memberController.signup); // membercontrollerni ichidagi signupga borayopti.
router.post("/login", memberController.login); // membercontrollerni ichidagi loginga borayopti.
// router.get("/logout", memberController.logout); // membercontrollerni ichidagi logoutga borayopti.


// section routerlar
router.get("/menu", (req, res) => {
    res.send("Menu sahifadasiz");
});

router.get("/community", (req, res) => {
    res.send("Jamiyat sahifadasiz");
});

//bu faylni expoert qilamiz boshqa faylga.
module.exports = router;