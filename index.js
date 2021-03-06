const express = require("express");
const bodyParser = require("body-parser");
//const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const app = express();
const port = process.env.PORT || 5000

// const http = require("http");
// const https = require("https");
// let clientHttp = http;
// const url = new URL('https://dry-woodland-89666.herokuapp.com');

// clientHttp = (url.protocol == "https") ? https:clientHttp;

// setInterval(function() {
//     https.get(url);
// }, 600000); 

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

const transfer = async (nombreJugador, nombreOrigen, nombreDestino) => {
  const collection = client.db("fifafriends").collection("sueldos");
  let origen = await collection.find({equipo: nombreOrigen}).toArray();
  let destino = await collection.find({equipo: nombreDestino}).toArray();
  
  let jugador = origen[0].plantilla.filter(jug => jug.nombre == nombreJugador)[0];
  let plantillaOrigen = origen[0].plantilla.filter(jug => jug.nombre != nombreJugador);
  let totalSalarioOrigen = plantillaOrigen.reduce((total, jugador) => total + jugador.sueldo , 0);
  let plantillaDestino = [...destino[0].plantilla, jugador ];
  let totalSalarioDestino = plantillaDestino.reduce((total, jugador) => total + jugador.sueldo, 0);
  totalSalarioOrigen = parseFloat(totalSalarioOrigen);
  totalSalarioDestino = parseFloat(totalSalarioDestino);
  console.log(typeof totalSalarioOrigen, totalSalarioOrigen);
  

  
  await collection.updateOne({equipo: nombreOrigen}, {
    $set: {
      plantilla: plantillaOrigen,
      totalSueldos: totalSalarioOrigen
    }
  })

  await collection.updateOne({equipo: nombreDestino}, {
    $set: {
      plantilla: plantillaDestino,
      totalSueldos: totalSalarioDestino
    }
  })
}


app.post('/transfer', (req, res) => {
  const {jugador, origen, destino} = req.body
  transfer(jugador, origen, destino);
  res.json({
    jugador,
    origen,
    destino    
  })
})



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
            totalSueldos: req.body.totalSueldos,
            enviado: true
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
