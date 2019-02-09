const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

const { MONGO_UI } = require("./config/database");

const indexRoute = require("./routes/api/");
const customerRoute = require("./routes/api/customer");

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_UI, {
    useNewUrlParser: true
  })
  .then(res => console.log(`connected to mongodb...`))
  .catch(err => {
    throw err.message;
  });

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods', 
      'PUT, POST, PATCH, GET, DELETE'
    );
    res.status(200).json({});
  }
  next();
});

app.use('/test', indexRoute);
app.use('/api', customerRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}...`));