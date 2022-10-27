const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URL;
mongoose.Promise = global.Promise;

//console.log('here');

const connectToDatabase = async () => {
  let isConnected;
  if (isConnected) {
    console.log('using existing database connection');
    return Promise.resolve();
  }

  //console.log('using new database connection');
  const database = await mongoose.connect('mongodb+srv://admin:r1V6B5TxoYM0x4Jx@cluster0.cadqgpg.mongodb.net/?retryWrites=true&w=majority');
  isConnected = database.connections[0].readyState;
  // return isConnected;
};

module.exports = connectToDatabase;
