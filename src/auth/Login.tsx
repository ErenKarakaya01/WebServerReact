import { useState } from 'react';
import { setAuthHeader, setId } from '../services/BackendService';
import { CustomJwtPayload } from 'src/entities/CustomJwtPayload';
import { jwtDecode } from 'jwt-decode';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from 'src/app/Layout';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          setAuthHeader(data['token']);
          setId(data['id']);
          const decoded = jwtDecode<CustomJwtPayload>(data['token']);

          if (decoded.role === 'ADMIN') {
            navigate('/admin/courses');
          } else {
            navigate('/user');
          }
        } else {
          setAuthHeader(null);
        }
      });
  };

  return (
    <Layout>
      <div>
        <h1>Login</h1>
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
            SignIn
          </Button>
          <Button variant="outlined" onClick={() => navigate('/register')}>
            Register
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
