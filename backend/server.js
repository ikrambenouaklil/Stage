const express = require("express")
const mongoose = require("mongoose");


const app = express()
const port = 3008;

//midlleware  data = format json 
app.use(express.json())
// db connection
//mongodb://admin:admin@localhost:27017/BRA?authSource=admin
mongoose.connect('mongodb://admin:admin@localhost:27017/BRA?authSource=admin');
 const db = mongoose.connection
db.on('error',()=>{
  console.log("error db connection!")
})


db.once('open',()=>{
  console.log("connected to db !")
})

app.listen(port, (req, res) => {
  console.log('this port :'+port+' is open');
});