const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());


const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => console.log('connected'))

app.get('/equipo', (req,res) => {  
    const collection = client.db("fifafriends").collection("sueldos")
    collection.find().toArray((err, result) => {
      if(err) throw err;
      res.send(result);
    })  
})

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

app.patch("/equipo/:loginCode",  (req, res) => {
  if(req.body.plantilla && req.body.patrocinador) {
    client.connect(async (err) => {
      const collection = client.db("fifafriends").collection("sueldos");
      const query = { loginCode: req.params.loginCode };
      try{
        await  collection.updateOne(query, {
          $set: {
            patrocinador: req.body.patrocinador,
            plantilla: req.body.plantilla
          }
        });
        res.json({
          message: 'Plantilla actualizada correctamente',
          patrocinador: req.body.patrocinador,
          plantilla: req.body.plantilla
        })
      } catch(err){
        res.status(500).send('Error al actualizar plantilla y patrocinador');
      }
      
      
    })
  } else {
    res.status(500).send("No se ha recibido ninguna plantilla");
  }
})

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
