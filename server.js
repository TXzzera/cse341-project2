const express =  require ('express');
const routes = require ('./routes/index.js');
const mongodb =  require ('./data/database.js');
<<<<<<< HEAD
const bodyparser = require ('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  next();
});
=======

const app = express();

>>>>>>> b20e15aeaccdf4af451f8443150f44783547048e
app.use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else{
    app.listen(process.env.PORT || 3000, () => {
    console.log('Database is running on port ' + (process.env.PORT || 3000));});
  }});
  


