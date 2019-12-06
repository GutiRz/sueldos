const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));


const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("fifafriends").collection("sueldos");
  // perform actions on the collection object
  var query = { equipo: "Racing de Santander" };
  collection.find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    //db.close();
  });

  client.close();
});