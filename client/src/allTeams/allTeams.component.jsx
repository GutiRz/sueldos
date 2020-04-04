import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FaceIcon from '@material-ui/icons/FaceOutlined';
import { Button } from "@material-ui/core";
import {useHistory, useLocation} from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
    backgroundColor: theme.palette.background.paper
  },
  table: {
    minWidth: 340
  }
}));

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

export const AllTeamsComponent = () => {
  const history = useHistory();
  const query = useQuery();
  const [teams, setTeams] = React.useState({});
  const [playersList, setPlayersList] = React.useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetch(`/equipo`)
      .then(response => response.json())
      .then(data => {
        setTeams(data.sort((a, b) => (a.equipo > b.equipo ? 1 : -1)));
        setPlayersList(data.map(team => [...playersList, ...team.plantilla]).flat());
      });
  }, []);


  return (
    <div className={classes.root}>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {Object.values(teams)
          .sort((a, b) => (a.equipo > b.equipo ? 1 : -1))
          .map((team, index) => (
            <Tab
              key={team.loginCode}
              label={team.equipo}
              {...a11yProps(index)}
            />
          ))}
      </Tabs>

      {Object.values(teams).map((team, index) => (
        <>

          <TabPanel value={value} index={index} key={team.loginCode}>
            <div>
              <Autocomplete
                id="combo-box-demo"
                options={playersList}
                getOptionLabel={(option) => option.nombre}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Jugador ya en liga" variant="outlined" fullWidth />
                )}
              />
              { query.get('admin') === 'sesi' ? <Button onClick={() => history.push('/lesionados')}>Lesiones semanales</Button> : ''}
            </div>

            <Typography variant="h5" style={{ marginTop: "30px" }}>
              Total sueldos:{team.totalSueldos.toFixed(2)}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "30px" }}>
              Patrocinador:{team.patrocinador}
            </Typography>
            <Chip variant="outlined" icon={<FaceIcon />} label={`Total jugadores:${team.plantilla.length}`} color={team.plantilla.length >= 30 || team.plantilla.length <= 25 ? 'secondary' : 'default'} />
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <b>Nombre</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>Posición</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>Sueldo</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>Cláusula</b>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <b>Transfermarkt</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortByPosition(team.plantilla).map(jugador => (
                  <TableRow key={jugador.nombre}>
                    <TableCell className={classes.tableCell}>{jugador.nombre}</TableCell>
                    <TableCell className={classes.tableCell}><Chip style={{
                      backgroundColor: (jugador.posicion == 'POR') ? '#ff6e40' :
                        (jugador.posicion === 'DFC') ? '#ffee58' :
                          (jugador.posicion === 'LTI' || jugador.posicion === 'LTD') ? '#fbc02d' :
                            (jugador.posicion === 'MCD') ? '#2e7d32' :
                              ((jugador.posicion === 'MC') ? '#4caf50' :
                                (jugador.posicion === 'MCO') ? '#81c784' :
                                  (jugador.posicion === 'MD' || (jugador.posicion === 'MI')) ? '#c8e6c9' :
                                    (jugador.posicion === 'DC') ? '#2196f3' :
                                      (jugador.posicion === 'EI' || jugador.posicion === 'ED') ? '#90caf9' :
                                        (jugador.posicion === 'SD') ? '#1565c0' : ''
                              )
                    }} label={jugador.posicion} /></TableCell>
                    <TableCell className={classes.tableCell}>{jugador.sueldo}</TableCell>
                    <TableCell className={classes.tableCell}>{jugador.clausula}</TableCell>
                    <TableCell className={classes.tableCell}>{jugador.transfermarket}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
        </>
      ))}
    </div>
  );
};
