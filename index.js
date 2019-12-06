const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();
const port = 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/equipo/:loginCode", (req, res) => {
  if (req.params.loginCode) {
    client.connect(err => {
      const collection = client.db("fifafriends").collection("sueldos");

      var query = { loginCode: req.params.loginCode };
      collection.find(query).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });

      client.close();
    });
  } else {
    res.status(500).send("Introduzca código de login!");
  }
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
