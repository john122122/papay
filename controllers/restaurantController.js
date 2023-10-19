// turli xil metodlarni yuklashimiz mumkin.
const Member = require("../models/Member");

// restaurantController object methodlari orqali boglanayopti
let restaurantController = module.exports;

restaurantController.getSignupMyRestaurant = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyRestaurant");
        res.render('signup');
    } catch (err) {
        console.log(`ERROR, cont/signup, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
}

restaurantController.signupProcess = async (req, res) => {
    try {
        console.log("POST: cont/signup");
        const data = req.body;
        console.log("body::", req.body);
        member = new Member(),
            new_member = await member.signupData(data);

        res.json({ state: "succeed", data: new_member });
    } catch (err) {
        console.log(`ERROR, cont/signup, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
    try {
        console.log("GET: cont/getLoginMyRestaurant");
        res.render('login-page');
    } catch (err) {
        console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
}

restaurantController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body;
        console.log("body::", req.body),
            member = new Member(),
            result = await member.loginDate(data);

        res.json({ state: "succeed", data: result });
    } catch (err) {
        console.log(`ERROR: cont/login, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
};
