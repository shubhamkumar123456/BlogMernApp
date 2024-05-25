const mongoose = require('mongoose');
require('dotenv').config()

const connectToDb = async()=>{
    mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to mongodb successfully!'))
  .catch(()=>console.log("error in connecting mongodb"))
}

module.exports = connectToDb;