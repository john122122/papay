// classlar orqali boglanayopti
const MemberModel = require("../schema/member.model");       // Schema modelni chaqirib olamiz.
const Definer = require("../lib/mistake");


class Member {
    constructor() {
        this.memberModel = MemberModel;   // service model ichida schema model =dan foydalinyabdi
    }
    async signupData(input) {
        try {
            let result;
            const new_member =  new this.memberModel(input);  // schema modeldan  class sifatida foydalanib uni ichida datani berib, yangi object hosil qilib
            try {
                result = await new_member.save();    // u objectni ichida save methodan foydalangan holda memberni hosil qilamiz
            } catch (mongo_err) {
              console.log(mongo_err);
              throw new Error(Definer.auth_err1);  //definer classsini yasab olamiz.
            }
            // console.log(result);
            result.mb_password = "";
            return result;
        } catch (err){
            throw err;
        }
    }
}


module.exports = Member;