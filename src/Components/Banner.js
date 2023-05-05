import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AccountContext } from './Account';


const theme = createTheme();

function Banner() {

  const [currentSession, setCurrentSession] = useState(null)
  const { getCognitoSession, logout } = useContext(AccountContext);

  useEffect(() => {

    getCognitoSession().then((session) => {
      setCurrentSession(session)
    }, (err) => {
      setCurrentSession(null)
    })
  }, [getCognitoSession]);

  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/Login');
  };
  const handleLogout = () => {
    logout()
    navigate('/');
  };

  const LoginButton = () => {
    if (currentSession) {
      return (
        <div>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            {currentSession.user.userName}

          </Typography>

          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>
      );
    }
    else return (
      <Button color="inherit" onClick={handleLogin}>Login</Button>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Phyisics Questions/Answers
            </Typography>
            <LoginButton />
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

export default Banner