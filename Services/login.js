const models = require('../Model/product');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

module.exports = {
async createUser (user) {
  let result = await models.User.create(user);
  if(result) {
    return {
      data: user,
      message: "User successfully created!"
      };
  }
return "Error creating new user"
},

/*authentication by passing emailid and password using hash mechanism*/
async getUser (email,pass){
   let result = await models.User.findOne({'email':email});
   if(!result) {
      return "Email not found";
   }
   let result2=await bcrypt.compare(pass,result.passwordHash);
   if(!result2) {
      return "Error with credentials";
   }else {
     return {
       data: result,
       message: "User credentials found!"
       };
    }
  },

async getall (){
    let result=await models.User.find();
    if(result) {
          return {
            data:result,
            message: "all users"
        }
     }
    return "Error in listing all users"
},

};
