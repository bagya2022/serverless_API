const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid').v4
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbConnection = require('../dbConfigs');
const LoginService = require('../Services/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.post('/login', async (req, res) => {
   await res.send("<h3>Welcome to the Product API for serverless Example!!</h3>")
   
});

app.post('/register', async (req, res) => {
  try {
   await dbConnection();
   const data  = req.body;
   const salt = await bcrypt.genSalt(10);

   const {email, type, id, passwordHash} = data;
 if(!data) {
     return "Please pass all required fields!"
  }
const hashedPassword = await bcrypt.hash(req.body.passwordHash, 10);
const dataToSave = {email,type,id:uuid(),passwordHash:hashedPassword};

   let createUser =  await LoginService.createUser(dataToSave);
   if (createUser) {
     return res.status(200).send(
       createUser
    )
   }
  } catch (error) {
    //  handle errors here
    console.log(error, "error!!");
  }
});

module.exports.handler = serverless(app);
