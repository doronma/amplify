import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import { AccountContext } from './Account';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function CreateQuestion() {

  const { getUserName } = useContext(AccountContext);
  const navigate = useNavigate()
  const [fetchedData, setFetchedData] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    console.log(getCurrentTime())
    
    const question = {

      QuestionID: data.get('id'),
      date: getCurrentTime(),
      message: data.get('question'),
      userName: data.get('user')

    }
    const url = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions";
    const getData = async () => {
      const result = await axios.post(url, question, {
        headers: {
          'Content-Type': 'application/json',  
        }
      })
      //setFetchedData(result);
      //console.log(fetchedData)
      navigate('/Main');
    };
    getData();

  }

  const getCurrentTime = () => {
    let current = new Date();
    let cDate = current.getDate() + '-'  + (current.getMonth() + 1) + '-' + current.getFullYear();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    return dateTime;
  }

  const getUuid = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array
  }


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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              value={getUuid()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User"
              name="user"
              value={getUserName()}
            />
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="question"
              name="question"
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