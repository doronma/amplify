import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { parseDate } from '../utils/formUtils'

export default function QuestionGrid() {

    const navigate = useNavigate()

    const createQuestion = () => {
        navigate('/Main/CreateQuestion');
    };

    const QuestionDetails = (id) => {
        return () => {
            navigate('/Main/QuestionDetails/' + id)
        }
    }

    const url = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions"
    const [fetchedData, setFetchedData] = useState([]);
    const [searchString, setSearchString] = useState('')

    const handleMessageSearchChange = (event) => {
        const value = event.target.value
        if (value.length === 0 || value.length >= 3) {
            setSearchString(value)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(url)

            setFetchedData(result);
        };
        getData();
    }, []);

    const questions = () => {
        if (fetchedData.data) {
            let questionArray = fetchedData.data;
            questionArray = questionArray.filter((question) => {
                if (searchString.length === 0) return true
                return question.message.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
            });

            questionArray.sort((a, b) => {
                const a_num = parseDate(a.date)
                const b_num = parseDate(b.date)
                let comparison = 0;
                if (a_num > b_num) {
                    comparison = 1;
                } else if (a_num < b_num) {
                    comparison = -1;
                }
                return comparison;
            });
            return questionArray.map((question) => (
                <Grid item key={question.QuestionID} xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >

                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {question.QuestionID}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {question.date}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {question.userName}
                            </Typography>
                            <Typography>
                                {question.message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={QuestionDetails(question.QuestionID)}>View</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))

        }
    }

    return (
        <div>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Questions List Page
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            This is the collection of Physicis Questions
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="messageSearch"
                            label="Question Search"
                            name="messageSearch"
                            onChange={handleMessageSearchChange}
                        />
                    </Container>
                </Box>
                <Container sx={{ py: 1 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {questions()}
                    </Grid>
                </Container>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={createQuestion}>Create new question</Button>
                </Stack>
            </main>
        </div>
    );
}