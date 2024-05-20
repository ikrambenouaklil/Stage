const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multer = require('multer')

app.use( cors());
const besoinR = require('./routes/besoinR');
const compteComp = require('./routes/compteComptableR');
const compagneBudg = require('./routes/compagneBudg');
const elaboration = require('./routes/elaboration');
const Authuser = require('./routes/Authuser')

const user = require('./routes/userRoutes');
const port = process.env.PORT || 3010;
const cookieParser = require('cookie-parser')
//multer 

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./NoteOrientation");
//   },
//   filename: function (req, file, cb) {

//     const FileName = ` ${file.originalname}_${Date.now()}`;
//     cb(null, FileName);
//   },
// });  
// const upload = multer({ storage }).single('receipt')

// db connection

mongoose.connect(
  "mongodb+srv://ikrambn2002:QzIAauYjFGx3nlOs@braapp.6nhqiuq.mongodb.net/BRA");
const db = mongoose.connection;
db.on('error', () => {
  console.log('error db connection!');
});

db.once('open', () => {
  console.log('connected to db !');
});
//midlleware
app.use(cors());
app.use(cookieParser())
//routes

app.use(express.json());


app.use('/auth',Authuser);
app.use('/users', user);
app.use(besoinR);
app.use(compteComp);
app.use(compagneBudg);
app.use(elaboration);

// app.post('/uploads', upload ,(req , res ) =>{
//   const {file}= req; 
//   res.send({
//     file: req.originalname, 
//     path : file.path
//   })
// })




//listen

app.listen(port, () => {
  console.log('this port :' + port + ' is open');
});
