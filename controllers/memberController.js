const assert = require("assert");
const Member = require("../models/Member");
const Definer = require("../lib/mistake");
jwt = require("jsonwebtoken");

let memberController = module.exports;

memberController.signup = async (req, res) => {
    try {    // satandartlarni qurish:
        console.log("POST: cont/signup");    //routerdan kirib kelgan req turi.
        const data=req.body,               //req body qismidan malumot olamiz.
            member=new Member(),
            new_member=await member.signupData(data);   //ichida request body yuborilyabdi
         
            
            console.log("result:::", new_member);
            const token = memberController.createToken(new_member);  //return bulgan valueni tookenga tenglashtiirb olayopmiz.
            res.cookie('access_token', token, {  //cookiesga => acsestokenni va undan hosil bulgan tokenni va
                maxAge: 6 * 3600 * 1000,         // token bn teng bulgan vaqtni olayopman.
                httpOnly: false,   // hardoim true bulishi lozim
            });

        res.json({state: 'success', data: new_member}); //standartdagi javob muaffaqiyatli bulsa
    } catch (err) {
        console.log(`ERROR, cont/signup, ${err.message}`);
        res.json({state: 'fail', message: err.message}); // standartdagi javob xato bulsa
    }
};

memberController.login = async (req, res) => {
    try {                                        // satandartlarni qurish:
        console.log("POST: cont/login");        //routerdan kirib kelgan req turi.
        const data = req.body,                  //req body qismidan malumot olamiz.
            member = new Member(),
            result = await member.loginData(data);   //ichida request body yuborilyabdi

            const token = memberController.createToken(result);  //return bulgan valueni tookenga tenglashtiirb olayopmiz.
            // console.log("token:::", token);
            res.cookie('access_token', token, {  //cookiesga => acsestokenni va undan hosil bulgan tokenni va
                maxAge: 6 * 3600 * 1000,         // token bn teng bulgan vaqtni olayopman.
                httpOnly: false,   // hardoim true bulishi lozim
            });


        res.json({ state: "success", data: result });             //standartdagi javob muaffaqiyatli bulsa
    } catch (err) {
        console.log(`ERROR, cont/login, ${err.message}`);
        res.json({state: 'fail', message: err.message});       // standartdagi javob xato bulsa
    }
};

memberController.logout=(_req, res) => {
    console.log("GET cont/logout");
    res.cookie("access_token", null, {maxAge: 0, httpOnly: true});
    res.json({ state: "success", data: 'logout successfully!' });   
};

memberController.createToken = (result) => {
    try {
        const upload_data = {
            _id: result._id,
            mb_nick: result.mb_nick,
            my_type: result.mb_type
        };

        const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
             expiresIn: '6h',
        });

     assert.ok(token, Definer.auth_err2);  // tokenda xatolik bulsa kursatsin
    return token;                          //xatolik bulmasa tokenni olsin.
    } catch(err) {
      throw err;
    }
};

memberController.checkMyAuthentication = (req, res) => {
    try {
        console.log('GET cont/checkMyAuthentication');
        let token = req.cookies["access_token"];
        // console.log("token:::", token);

        const member = token ? jwt.verify(
            token, process.env.SECRET_TOKEN
        ) : null;
        assert.ok(member, Definer.auth_err2);

        res.json({ state: "success", data: member }); 
    } catch(err) {
      throw err;
    }
};

memberController.getChosenMember = async (req, res) => {
   try {
    console.log("GET cont/getChosenMember");
    const id = req.params.id;

    const member = new Member();
    const result = await member.getChosenMemberData(req.member, id); 
    res.json({ state: "success", data: result }); 
  } catch (err) {
    console.log(`ERROR, cont/getChosenMember, ${err.message}`);
    res.json({ state: "fail", message: err.message }); 
   }
};

memberController.likenMemberChosen = async (req, res) => {
    try {
     console.log("POST cont/likenMemberChosen");
     assert.ok(req.member, Definer.auth_err5);

     const member = new Member(),
     like_ref_id = req.body.like_ref_id,
     group_type = req.body.group_type;

     const result = await member.likeChosenItemByMember(
        req.member,
        like_ref_id,
        group_type
     );
    
     res.json({ state: "success", data: result }); 
   } catch (err) {
     console.log(`ERROR, cont/likenMemberChosen, ${err.message}`);
     res.json({ state: "fail", message: err.message }); 
    }
};
 
memberController.updateMember = async (req, res) => {
    try {
     console.log("POST cont/updateMember");
     assert.ok(req.member, Definer.auth_err3);

     const member = new Member();
     const result = await member.updateMemberData(
        req.member?._id,
        req.body,
        req.file
     );
    
     res.json({ state: "success", data: result }); 
   } catch (err) {
     console.log(`ERROR, cont/updateMember, ${err.message}`);
     res.json({ state: "fail", message: err.message }); 
    }
 };

memberController.retrieveAuthMember = (req, res, next) => {
    try {
        const token = req.cookies["access_token"];
        req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
        next();
    } catch (err) {
        console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
        next();
    }
};