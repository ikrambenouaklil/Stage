// to add the import i shuld add "type" : "module", in the package.json
import express  from 'express'
import cors from 'cors' 
const app = express();
const port = 3008

app.use(cors())
//
app.use(express.json)
// get informations from the database 
app.get('/', function (req, res) {
  res.send('hello world!');
});


app.listen(port, function (req, res) {
 console.log('hello world');
});