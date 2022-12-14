import { useContext, useState } from 'react';
import { AccountContext } from './Account';
import SignIn from './Login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
        console.log(data);
        //alert(data)
        alert('login success');
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert('login failure');
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <br></br>
      <div>
      <SignIn/>
      </div>
    </div>
  );
}

export default Login;