const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const app = express();
const cors = require('cors');
const besoinR = require('./routes/besoinR');
const compteComp = require('./routes/compteComptableR');
const PORT = process.env.PORT;
//midlleware  data = format json
app.use(express.json());
app.use(cors)
// db connection

mongoose.connect('mongodb://admin:admin@localhost:27017/BRA?authSource=admin');
const db = mongoose.connection;
db.on('error', () => {
  console.log('error db connection!');
});

db.once('open', () => {
  console.log('connected to db !');
});
//routes
app.use(besoinR);
app.use(compteComp);

//listen

app.listen(PORT, (req, res) => {
  console.log('this port :' + PORT + ' is open');
});
