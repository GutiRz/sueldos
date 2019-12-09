import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginTop: "30px"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);



export const Patrocinadores = (props) => {
  const classes = useStyles({});
  const {patrocinador, handlePatrocinador} = props;

  const onSelectPatrocinador = (e) => {
    handlePatrocinador(e.target.value);
  }
  return (
    <FormControl className={classes.formControl}>
        <InputLabel id="">Patrocinador</InputLabel>
        <Select
          value={patrocinador}
          onChange={onSelectPatrocinador}
        >
          <MenuItem value="Optimista">Optimista</MenuItem>
          <MenuItem value="Neutral">Neutral</MenuItem>
          <MenuItem value="Pesimista">Pesimista</MenuItem>
        </Select>
      </FormControl>
  )
}