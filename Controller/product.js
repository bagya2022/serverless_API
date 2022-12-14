const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid').v4

const dbConnection = require('../dbConfigs');
const ProductService = require('../Services/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/index', async (req, res) => {
   await res.send("<h3>Welcome to the Product API for serverless Example!!</h3>")
})

//  function for creating a new product
app.post('/', async (req, res) => {
  try {
   await dbConnection();
   const data  = req.body;
   const {name, type, description, cost} = data;
 if(!data) {
     return "Please pass all required fields!"
  }
   const dataToSave = {name,type,description,cost,productId:uuid()};
   let createProduct =  await ProductService.createProduct(dataToSave);
   if (createProduct) {
     return res.status(200).send(
       createProduct
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
})

//  function for getting all products
app.get('/', async (req, res) => {
try {
    await dbConnection();
    const allProducts = await ProductService.getAllProduct();
    if (allProducts) {
      return res.status(200).send({
        data: allProducts
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})


//  function for getting a  product by its name
app.get('/pr/:nam/', async (req, res) => {
  try {
    await dbConnection();
    const nam = req.params.nam;
    console.log(nam);

    const result = await ProductService.getProduct(nam);
    if(result) {
      return res.status(200).send({
        data: result
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})

//  function for getting a  product by its ID
app.get('/:prodId/', async (req, res) => {
  try {
    await dbConnection();
    const prodId = req.params.prodId;
    const result = await ProductService.getProductById(prodId);
    if(result) {
      return res.status(200).send({
        data: result
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})

//  function for deleting a product using its id
app.delete('/:Id/', async (req, res) => {
  try {
    await dbConnection();
    const Id = req.params.Id;
    const result = await ProductService.delproduct(Id);
    if(result) {
      return res.status(200).send({
        data: result
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
})

//  function for editing a product using its id
app.put('/:Id/', async (req, res) => {
  try {
    await dbConnection();
    const Id = req.params.Id;
    const result = await ProductService.editproduct(Id,req);
    if(result) {
      return res.status(200).send({
        data: result
      })
    }
  } catch (error) {
     //  handle errors here
     console.log(error, "error!!");
  }
});

module.exports.handler = serverless(app);
