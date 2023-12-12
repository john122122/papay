const BoArticleModel = require("../schema/bo_article.model");
const Definer = require("../lib/mistake");
<<<<<<< HEAD
const { shapeIntoMongooseObjectId } = require("../lib/config");
const assert = require("assert");
const { create } = require("../schema/member.model");
=======
const { 
    shapeIntoMongooseObjectId,
    board_id_enum_list
} = require("../lib/config");
const assert = require("assert");

>>>>>>> 1a14425 (fix: modify getMemberArticles bugs  api)

class Community {
    constructor() {
        this.boArticleModel = BoArticleModel;
    }

    async createArticleData(member, data) {
        try {
          data.mb_id = shapeIntoMongooseObjectId(member._id);
          const new_article = await this.saveArticleData(data);
<<<<<<< HEAD
          return new_article;
        } catch(err) {
          throw err;
        } 
    }

    async saveArticleData(data) {
        try {
          const article = new this.boArticleModel(data);
          return await article.save();
        } catch (mongo_err) {
          console.log(mongo_err);
          throw new Error(Definer.auth_err1);
            
        }
    }

    async getMemberArticlesData(member, mb_id, inquery) {
        try {
            const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
            mb_id = shapeIntoMongooseObjectId(mb_id);
            const page = inquery["page"] ? inquery["page"] * 1 : 1;
            const limit = inquery["limit"] ? inquery["limit"] * 1 : 5;

            const result = await this.boArticleModel
                .aggregate([
                    { $match: { mb_id: mb_id, art_status: "active" } },
                    { $sort: { createdAt: -1 } },
                    { $skip: (page -1) * limit },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: "member", 
                            localField: "mb_id",
                            foreignField: "_id",
                            as: "member_data",
                        },
                    },
                ])
                .exec();
                assert.ok(result, Definer.article_err2);

                return result;
        } catch (err) {
          throw err;  
        }
    }
=======
          // console.log("new_article:::", new_article);
          return new_article;
        } catch (err) {
          throw err;
        }
      }
    
      async saveArticleData(data) {
        try {
          const article = await this.boArticleModel(data);
          return await article.save();
        } catch (mongo_err) {
          console.log("mongo_err>>>", mongo_err);
          throw new Error(Definer.auth_err1);
        }
      }
    
      async getMemberArticlesData(member, mb_id, inquery) {
        try {
          const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
          mb_id = shapeIntoMongooseObjectId(mb_id);
          const page = inquery["page"] ? inquery["page"] * 1 : 1;
          const limit = inquery["limit"] ? inquery["limit"] * 1 : 5;
    
          const result = await this.boArticleModel
            .aggregate([
              { $match: { mb_id: mb_id, art_status: "active" } },
              { $sort: { createdAt: -1 } },
              { $skip: (page - 1) * limit },
              { $limit: limit },
              {
                $lookup: {
                  from: "members",
                  localField: "mb_id",
                  foreignField: "_id",
                  as: "member_data",
                },
              },
              { $unwind: "$member_data" },
              // todo: check auth liked the chosen target
            ])
            .exec();
          assert.ok(result, Definer.article_err2);
    
          return result;
        } catch (err) {
          throw err;
        }
      }
    
>>>>>>> 1a14425 (fix: modify getMemberArticles bugs  api)
}

module.exports = Community;