import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {  useLocation } from "react-router";
import Container from "@material-ui/core/Container";

import { Patrocinadores } from "./patrocinadores";
import { Jugadores } from "./jugadores";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    bigAvatar: {
      width: 120,
      height: 120
    },
    contenedor: {
      display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
    },
    separador: {
      width: "100%"
    },
    margen: {
      marginTop: '100px',
      marginBottom: '200px'
    },
    margen2: {
      marginTop: '30px',
    }
  })
);

function sortByPosition(array) {
  var sortOrder = [
    "POR",
    "DFC",
    "LTD",
    "LTI",
    "MCD",
    "MC",
    "MCO",
    "MD",
    "MI",
    "DC",
    "SD",
    "ED",
    "EI"
  ];

  array.sort(
    (a, b) => sortOrder.indexOf(a.posicion) - sortOrder.indexOf(b.posicion)
  );

  return array;
}

export const TeamComponent = () => {
  const location = useLocation();
  const [team, setTeam] = React.useState(location.state.team);
  const classes = useStyles({});

  React.useEffect(() => console.log(team), [team]);

  const handlePatrocinador = patrocinador => {
    setTeam({
      ...team,
      patrocinador
    });
  };

  const handleSueldo = (sueldo, nombreJugador) => {
    const plantilla = team.plantilla.map(jug => {
      if (jug.nombre === nombreJugador) {
        jug.sueldo = parseFloat(sueldo);
        jug.clausula = jug.sueldo * 10;
      }
      return jug;
    });
    const totalSueldos = plantilla.reduce(
      (total, jugador) => total + jugador.sueldo,
      0
    );

    setTeam({
      ...team,
      plantilla,
      totalSueldos
    });
  };

  const sendSalaries = () => {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(team)
    };
    fetch(`/equipo/${team.loginCode}`, options)
      .then(res => alert("Sueldos enviados correctamente"))
      .catch(err => console.log(err));
  };

  return (
    <Container className={classes.contenedor}>
      <Typography variant="h3" className={classes.margen2}>{team.equipo}</Typography>
      <div className={classes.separador}></div>
      <img src={team.escudo} style={{marginTop: '30px'}} alt="Logo" />
      <Patrocinadores
        patrocinador={team.patrocinador}
        handlePatrocinador={handlePatrocinador}
      />
      <Typography variant="h5">Patrocinador: {team.patrocinador}</Typography>
      <Typography variant="h5" style={{marginTop: '30px'}}>Total sueldos:{team.totalSueldos}</Typography>
      <Jugadores jugadores={sortByPosition(team.plantilla) } handleSueldo={handleSueldo} />

      <Button variant="contained" color="primary" onClick={sendSalaries} className={classes.margen}>
        Enviar sueldos
      </Button>
    </Container>
  );
};
