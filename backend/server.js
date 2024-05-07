const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use( cors());
const besoinR = require('./routes/besoinR');
const compteComp = require('./routes/compteComptableR');
const compagneBudg = require('./routes/compagneBudg');
const elaboration = require('./routes/elaboration');
const Authuser = require('./routes/Authuser')

const user = require('./routes/userRoutes');
const port = process.env.PORT || 3010;
const cookieParser = require('cookie-parser')



// db connection

mongoose.connect('mongodb://admin:admin@localhost:27017/BRA?authSource=admin');
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

//listen

app.listen(port, () => {
  console.log('this port :' + port + ' is open');
});
