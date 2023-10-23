const Member = require("../models/Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
    try {
        console.log("POST: cont/signup");
        const data = req.body;
        console.log("body:", req.body);
        const member = new Member();
        const new_member = await member.signupData(data);
        // TO-DO: AUTHENTICATED BASED ON JWT

        res.json({ state: "succeed", data: new_member });
    } catch (err) {
        console.log(`ERROR: cont/signup, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
};

memberController.login = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body;
        console.log("body:", req.body);

        const member = new Member();
        const result = await member.loginData(data);

        res.json({ state: "succeed", data: result });
    } catch (err) {
        console.log(`ERROR: cont/login, ${err.message}`);
        res.json({ state: "failed", message: err.message });
    }
};

memberController.logout = (req, res) => {
    console.log("POST cont.logout");
    res.send("You are in Logout Page");
};


// // turli xil metodlarni yuklashimiz mumkin.
// const Member = require("../models/Member");
// // memberController object methodlari orqali boglanayopti
// let memberController = module.exports;

// memberController.signup = async (req, res) => {
//     try {
//         console.log("POST: cont/signup");
//         const data = req.body;
//         console.log("body::", req.body);
//         (member = new Member()), (new_member = await member.signupData(data));
//         res.json({ state: "succeed", data: new_member });
//     } catch (err) {
//         res.json({ state: "failed", message: err.message });
//         console.log(err.message);
//     }
// };

// memberController.login = async (req, res) => {
//     try {
//         console.log("POST: cont/login");
//         const data = req.body;
//         console.log("body::", req.body),
//             (member = new Member()),
//             (result = await member.loginDate(data));
//         res.json({ state: "succeed", data: result });
//     } catch (err) {
//         console.log("ERROR: cont/login", err.message);
//         res.json({ state: "failed", message: err.message });
//     }
// };
