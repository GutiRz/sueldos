const express = require("express");
const bodyParser = require("body-parser");
//const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const app = express();
const port = process.env.PORT || 5000

var http = require("http");
var https = require("https");
client = http;
const url = new URL('https://dry-woodland-89666.herokuapp.com');

client = (url.protocol == "https") ? https:client;

setInterval(function() {
    client.get(url);
}, 600000); 

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

const generateRandomCode = (() => {
  const USABLE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789".split("");

  return length => {
    return new Array(length).fill(null).map(() => {
      return USABLE_CHARACTERS[Math.floor(Math.random() * USABLE_CHARACTERS.length)];
    }).join("");
  }
})();

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => console.log("connected"));



app.post("/equipo",async (req, res) => {
  const collection = client.db("fifafriends").collection("sueldos");
  const {equipo, presupuesto, totalSueldos, patrocinador, escudo, plantilla} = req.body
  const team = {
    loginCode: generateRandomCode(6),
    equipo,
    presupuesto,
    totalSueldos,
    patrocinador,
    escudo,
    plantilla
  }
  try {
    await collection.save(team);
    res.json({message:"Equipo insertado", team})
  } catch(err) {
    res.status(500).send("Error al guardar el equipo" + err);
  }
})

app.get("/equipo", (req, res) => {
  const collection = client.db("fifafriends").collection("sueldos");
  collection.find().toArray((err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/equipo/:loginCode", (req, res) => {
  if (req.params.loginCode) {
    const collection = client.db("fifafriends").collection("sueldos");
    var query = { loginCode: req.params.loginCode };

    collection.find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.status(500).send("Introduzca código de login!");
  }
});


app.patch("/equipo/:loginCode", (req, res) => {
  if (req.body.plantilla && req.body.patrocinador) {
    client.connect(async err => {
      const collection = client.db("fifafriends").collection("sueldos");
      const query = { loginCode: req.params.loginCode };
      try {
        await collection.updateOne(query, {
          $set: {
            patrocinador: req.body.patrocinador,
            plantilla: req.body.plantilla,
            totalSueldos: req.body.totalSueldos
          }
        });
        res.json({
          message: "Plantilla actualizada correctamente",
          patrocinador: req.body.patrocinador,
          plantilla: req.body.plantilla,
          totalSueldos: req.body.totalSueldos
        });
      } catch (err) {
        res.status(500).send("Error al actualizar plantilla y patrocinador");
      }
    });
  } else {
    res.status(500).send("No se ha recibido ninguna plantilla");
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
