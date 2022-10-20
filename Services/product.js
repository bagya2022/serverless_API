const models = require('../Model/product');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
async createProduct (product) {
  let result = await models.Product.create(product);
  if(result) {
    return {
      data: product,
      message: "Product successfully created!"
      };
  }
return "Error creating new product"
},

async getAllProduct()  {
  console.log("enters always");
  let product = await models.Product.find();
  if(product)  return product;
  return "Error fetching products from db"
},

async getProduct(nam)  {
  console.log(nam);
  let product = await models.Product.findOne({'name':nam});
  if(product) return product;
  return "Error fetching product from db";
},


async getProductById(prodId)  {
  let product = await models.Product.findOne({'productId':prodId});
  if(product) return product;
  return "Error fetching product from db";
},

async delproduct(Id)  {
  let product = await models.Product.deleteOne({'_id': ObjectId(Id)});
  if(product) return product;
  return "Error fetching product from db";
},

async editproduct(Id,req)  {
  let product = await models.Product.findOne({'_id': ObjectId(Id)});
    if(product){
      product.name=req.body.name;
      product.type=req.body.type;
      product.description=req.body.description;
      product.cost=req.body.cost;
    }
  let result = await models.Product.create(product);
    if(result) {
      return {
            data: product,
            message: "Product successfully updated!"
          };
      return "Error fetching product from db";
    }
  },
};
