import * as React from "react";
import Textfield from "@material-ui/core/TextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => 
createStyles({
  // root: {
  //   width: "100%",
  //   overflowX: "auto"
  // },
  // table: {
  //   width: "60%",
  //   minWidth: 650,
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   marginTop: "100px"
  // }
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
    width: '100vw'
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    textAlign: 'center',
    paddingRight: 4,
    paddingLeft: 5
  }
}));

export const Jugadores = props => {
  const classes = useStyles({});
  const { jugadores, handleSueldo } = props;

  const onSueldoChange = nombreJugador => e => {
    handleSueldo(e.target.value, nombreJugador);
  };
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}><b>Nombre</b></TableCell>
          <TableCell className={classes.tableCell}><b>Posición</b></TableCell>
          <TableCell className={classes.tableCell}><b>Sueldo</b></TableCell>
          <TableCell className={classes.tableCell}><b>Cláusula</b></TableCell>
          <TableCell className={classes.tableCell}><b>Transfermarkt</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jugadores.map(jugador => (
          <TableRow key={jugador.nombre}>
            <TableCell className={classes.tableCell}>{jugador.nombre}</TableCell>
            <TableCell className={classes.tableCell}>{jugador.posicion}</TableCell>
            <TableCell className={classes.tableCell}>
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
            <TableCell  className={classes.tableCell}>{(jugador.sueldo * 10).toFixed()}</TableCell>
            <TableCell  className={classes.tableCell}>{jugador.transfermarket}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Paper>
    
  );
};