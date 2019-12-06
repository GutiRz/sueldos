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



app.get("/miequipo", (req, res) => {
    client.connect(err => {
        const collection = client.db("fifafriends").collection("sueldos");
        // perform actions on the collection object
        var query = { loginCode: "abcdefg" };
        collection.find(query).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          //db.close();
        });
      
        client.close();
      });
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
