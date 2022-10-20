const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema (
  {
    name: {type: String},
    type: {type: String},
    cost: {type: Number},
    description: {type: String},
    productId: { type: String },
  },
  {timestamps: true}
);

const ProductModel = mongoose.model("product", ProductSchema);

const UserSchema = new mongoose.Schema (
  {
    email: {type: String},
    type: {type: String},
    id: {type: String},
    passwordHash: {type: String},
  },
  {timestamps: true}
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = { User:UserModel, Product:ProductModel};
