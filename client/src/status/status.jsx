import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export const Status = () => {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    fetch(`/equipo`)
      .then(response => response.json())
      .then(data => {
        setTeams(data.sort((a, b) => (a.equipo > b.equipo ? 1 : -1)));
      });
  }, []);
  return (
    <div>
      {teams.map(team => (
        <List>
          <ListItem>{team.equipo} - {team.enviado ? '✅' : '❌'}</ListItem>
        </List>
      ))}
    </div>
  )
}