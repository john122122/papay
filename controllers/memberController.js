// turli xil metodlarni yuklashimiz mumkin.
const Member = require("../models/Member");
// memberController object methodlari orqali boglanayopti
let memberController = module.exports;

memberController.signup = async (req, res) => {
    try {
        console.log("POST: cont/signup");
        const data = req.body;
        console.log("body::", req.body);
        (member = new Member()), (new_member = await member.signupData(data));
        res.json({ state: "succeed", data: new_member });
    } catch (err) {
        res.json({ state: "failed", message: err.message });
        console.log(err.message);
    }
};

// memberController.signup = async (req, res ) => {
//     try {    // satandartlarni qurish:
//         console.log("POST: cont/signup");    //routerdan kirib kelgan req turi.
//         const data = req.body;               //req body qismidan malumot olamiz.
//         const member = new Member();
//         const  new_member = await member.signupData(data);   //ichida request body yuborilyabdi
//         res.send("done");
//         // res.json({state: 'succeed', data: new_member}); //standartdagi javob muaffaqiyatli bulsa
//     } catch(err)  {
//         console.log(`ERROR, cont/signup, ${err.message}`);
//         // res.json({state: 'fail', message: err.message}); // standartdagi javob xato bulsa
//     }
// };

memberController.login = (req, res ) => {
    console.log("POST cont.login");
    res.send("login page");
};

memberController.logout = (req, res ) => {
    console.log("GET cont.logout");
    res.send("logout page");
};