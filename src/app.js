const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer')

const config = require('./config');
const db = require('./app/config/db/index');
//TODO: router
const router = require('./routers/index')

var app = express();
// conncet to DB
db.connect();

app.use(morgan('combined'))
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(express.static('public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methoads", 'PUT, POST, PUT, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
// action routers
router(app);

let port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server listening at http://localhost:${config.port}`)
})
