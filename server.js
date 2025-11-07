const express =  require ('express');
const routes = require ('./routes/index.js');
const mongodb =  require ('./data/database.js');

const app = express();

app.use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else{
    app.listen(process.env.PORT || 3000, () => {
    console.log('Database is running on port ' + (process.env.PORT || 3000));});
  }});
  


