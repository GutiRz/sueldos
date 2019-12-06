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
const uri = "mongodb+srv://admin:ORSigwjaBhSig1Mc@cluster0-0bbz6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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


/* let usuario = {
  nombre: "",
  apellido: ""
};

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ""
};

app.get("/", function(req, res) {
  respuesta = {
    error: true,
    codigo: 200,
    mensaje: "Punto de inicio"
  };
  res.send(respuesta);
});

app
  .route("/usuario")
  .get(function(req, res) {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: ""
    };
    if (usuario.nombre === "" || usuario.apellido === "") {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: "El usuario no ha sido creado"
      };
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "respuesta del usuario",
        respuesta: usuario
      };
    }
    res.send(respuesta);
  })
  .post(function(req, res) {
    if (!req.body.nombre || !req.body.apellido) {
      respuesta = {
        error: true,
        codigo: 502,
        mensaje: "El campo nombre y apellido son requeridos"
      };
    } else {
      if (usuario.nombre !== "" || usuario.apellido !== "") {
        respuesta = {
          error: true,
          codigo: 503,
          mensaje: "El usuario ya fue creado previamente"
        };
      } else {
        usuario = {
          nombre: req.body.nombre,
          apellido: req.body.apellido
        };
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: "Usuario creado",
          respuesta: usuario
        };
      }
    }

    res.send(respuesta);
  })
  .put(function(req, res) {
    if (!req.body.nombre || !req.body.apellido) {
      respuesta = {
        error: true,
        codigo: 502,
        mensaje: "El campo nombre y apellido son requeridos"
      };
    } else {
      if (usuario.nombre === "" || usuario.apellido === "") {
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: "El usuario no ha sido creado"
        };
      } else {
        usuario = {
          nombre: req.body.nombre,
          apellido: req.body.apellido
        };
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: "Usuario actualizado",
          respuesta: usuario
        };
      }
    }

    res.send(respuesta);
  })
  .delete(function(req, res) {
    if (usuario.nombre === "" || usuario.apellido === "") {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: "El usuario no ha sido creado"
      };
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Usuario eliminado"
      };
      usuario = {
        nombre: "",
        apellido: ""
      };
    }
    res.send(respuesta);
  });

app.use(function(req, res, next) {
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: "URL no encontrada"
  };
  res.status(404).send(respuesta);
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
 */