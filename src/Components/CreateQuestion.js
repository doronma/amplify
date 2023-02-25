import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import { AccountContext } from './Account';
import { useNavigate } from 'react-router-dom';
import { Link as LinkR } from 'react-router-dom';

import Banner from './Banner';





export default function CreateQuestion() {


  const navigate = useNavigate()





  return (
    <div>
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
            <AddCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Physicis Question
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              name="ID"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User"
              name="user"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              name="date"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Question"
              label="Question"
              multiline
              rows={4}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}