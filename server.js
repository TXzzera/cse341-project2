const express =  require ('express');
const routes = require ('./routes/index.js');
const mongodb =  require ('./data/database.js');
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
app.use('/', routes);

process.on('uncaughtException', (err, origin) => {
  console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else{
    app.listen(process.env.PORT || 8082, () => {
    console.log('Database is running on port ' + (process.env.PORT || 8082));});
  }});
  


