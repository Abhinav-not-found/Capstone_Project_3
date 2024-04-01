const express = require('express')
const colors = require('colors')
const app = express();
require('dotenv').config()
const dbconfig =require('./config/dbconfig')
const userRoute =require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const doctorRoute = require('./routes/doctorRoute')


app.use(express.json())
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute);


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Listening on port ${port}`.white.bold.bgCyan));