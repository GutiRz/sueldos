import React from 'react';
export const Injuries = () => {
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    fetch('/lesionados')
      .then(res => res.json())
      .then(res => setPlayers(res));
  }, [])

  const handleNewWeek = () => {
    fetch('/lesiones')
      .then(res => {
        fetch('/lesionados')
          .then(res => res.json())
          .then(res => setPlayers(res));
      });
  }

  return(
    <div>
      <button onClick={handleNewWeek}>Nueva semana</button>
      <ul>
        {players.map(player => <li>{player.nombre}</li>)}
      </ul>
    </div>
  )
}