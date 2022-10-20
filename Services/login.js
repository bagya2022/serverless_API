const models = require('../Model/product');
const ObjectId = require('mongodb').ObjectId;

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
};
