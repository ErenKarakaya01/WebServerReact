import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        login: login,
        password: password,
        firstName: login,
        lastName: login,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          navigate('/login');
          toast.success('User registered successfully.');
        } else {
          toast.error('Error while registering user. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Error while registering user. Please try again.');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '20vh',
        }}
      >
        <TextField
          label="Login"
          name="login"
          onChange={(event) => setLogin(event.target.value)}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button variant="outlined" type="submit">
          Register
        </Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Register;
