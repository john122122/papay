// classlar orqali boglanayopti
const MemberModel = require("../schema/member.model");       // Schema modelni chaqirib olamiz.
const Definer = require("../lib/mistake");
const assert = require("assert");
const bcrypt = require("bcryptjs");

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
    async loginDate(input) {
        try {
            const member = await this.memberModel
                .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
                .exec();

            assert.ok(member, Definer.auth_err3);

            const isMatch = await bcrypt.compare(
                input.mb_password,
                member.mb_password
            );

            assert.ok(isMatch, Definer.auth_err4);

            return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
        } catch (err) {
            throw err;
        }
    }
}



module.exports = Member;