import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router';
import { LoginComponent } from './login.component';


export const LoginContainer = () => {
  const history = useHistory();
  const [teamCode, setTeamCode] = React.useState('');
  const [teamExist, setTeamExist] = React.useState(false);
  const [team, setTeam] = React.useState({});

  React.useEffect(() => {
    fetch(`/equipo/${teamCode}`)
      .then(response => response.json())
      .then(data => {
        data[0] ? setTeamExist(true) : setTeamExist(false);
        setTeam(data[0]);
      })
  }, [teamCode])

  const onTeamCodeUpdate = (newValue) => {
    setTeamCode(newValue);
  }

  const doLogin = () => {
    teamExist
      ? history.push({
        pathname: generatePath('/teams/:teamCode', { teamCode }),
        state: { team }
      })
      : alert('El código de acceso no es correcto, ponte en contacto con Sesi')
  }

  const onStatus = () => {
    history.push('/status')
  }

  return <LoginComponent
    teamCode={teamCode}
    onTeamCodeUpdate={onTeamCodeUpdate}
    onLogin={doLogin}
    onStatus={onStatus}
  />
}