import * as React from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { width } from "@material-ui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    position: 'fixed',
    top: 0,
    backgroundColor: 'white'
  },
  table: {
    minWidth: 340
  }
}));

export const AllTeamsComponent = () => {
  const [teams, setTeams] = React.useState({});

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetch(`/equipo`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {Object.values(teams).map((team, index) => (
            <Tab key={team.loginCode} label={team.equipo} {...a11yProps(index)} />
          ))}
        </Tabs>
      </div>
      

      {Object.values(teams).map((team, index) => (
        <TabPanel value={value} index={index} key={team.loginCode}>

          <Table className={classes.table} aria-label="simple table" >
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
              {team.plantilla.map(jugador => (
              <TableRow key={jugador.nombre}>              
                <TableCell className={classes.tableCell}>{jugador.nombre}</TableCell>
                <TableCell className={classes.tableCell}>{jugador.posicion}</TableCell>
                <TableCell className={classes.tableCell}>{jugador.sueldo}</TableCell>
                <TableCell  className={classes.tableCell}>{jugador.clausula}</TableCell>
                <TableCell  className={classes.tableCell}>{jugador.transfermarket}</TableCell>
              </TableRow>   
              ))}
            </TableBody>
          </Table>
          
        </TabPanel>
      ))}
    </div>
  );
};
