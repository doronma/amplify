import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';

import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

import Banner from './Banner';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {

  const [signinError, setSigninError] = useState(null);
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [username, setUsername] = useState('');
  

  const onSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: data.get('email'),
      })
    );
    setUsername(data.get('username'));
    UserPool.signUp(data.get('username'), data.get('password'), attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        setSigninError(err)
      } else {
        console.log(data);
        setVerifyProcess(true);
        setSigninError(null)
      }
    });
  };

  const verifyAccount = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(data.get('otp'), true, (err, data) => {
      if (err) {
        console.log(err);
        setSigninError(err)
      } else {
        console.log(data);
        navigate('/Login');
      }
    });
  };

  const Messages = () => {
    if (signinError != null) {
      return (
        <Alert severity="error">{signinError.toString()}</Alert>
      );
    }
  }

  const SigninForm = () => {
    if (!verifyProcess) {
      return (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>

        </Box>
      )
    } else {
      return (
        <Box component="form" onSubmit={verifyAccount} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoFocus
          />
           <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify email
          </Button>
          </Box>
      )
    };

  }

  const navigate = useNavigate()


  return (
    <ThemeProvider theme={theme}>
      <Banner />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <SigninForm />
        </Box>
        <Messages />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}