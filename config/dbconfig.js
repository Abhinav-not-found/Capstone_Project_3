const mongoose = require('mongoose')
const colors = require('colors')
mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;
connection.on("connected",()=>{
    console.log(`MongoDB is connected`.bgGreen.black.bold)
})
connection.on('error',(error)=>{
    console.log('Error in MongoDB connection',error);
})
module.exports=mongoose;