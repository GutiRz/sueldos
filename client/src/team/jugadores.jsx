import * as React from "react";
import Textfield from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    width: "60%",
    minWidth: 650,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "100px"
  }
});

export const Jugadores = props => {
  const classes = useStyles({});
  const { jugadores, handleSueldo } = props;

  const onSueldoChange = nombreJugador => e => {
    handleSueldo(e.target.value, nombreJugador);
  };
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><b>Nombre</b></TableCell>
          <TableCell><b>Posición</b></TableCell>
          <TableCell><b>Sueldo</b></TableCell>
          <TableCell><b>Cláusula</b></TableCell>
          <TableCell><b>Transfermarkt</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jugadores.map(jugador => (
          <TableRow key={jugador.nombre}>
            <TableCell>{jugador.nombre}</TableCell>
            <TableCell>{jugador.posicion}</TableCell>
            <TableCell>
              <Textfield
                type="number"
                value={jugador.sueldo}
                onChange={onSueldoChange(jugador.nombre)}
                inputProps={{
                  min: "0",
                  max: (jugador.transfermarket / 10).toString()
                }}
              />
            </TableCell>
            <TableCell>{(jugador.sueldo * 10).toFixed()}</TableCell>
            <TableCell>{jugador.transfermarket}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};