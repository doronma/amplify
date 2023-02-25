import * as React from 'react';
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
import axios from "axios";
import { useEffect, useState } from "react";

export default function QuestionGrid() {

    const url = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions"
    const [fetchedData, setFetchedData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(url)

            setFetchedData(result);
        };
        getData();
    }, []);

    const questions = () => {
        if (fetchedData.data) {
            const questionArray = fetchedData.data
            questionArray.sort((a, b) => {
                const a_num = Number(a.QuestionID)
                const b_num = Number(b.QuestionID)
                let comparison = 0;
                if (a_num > b_num) {
                    comparison = 1;
                } else if (a_num < b_num) {
                    comparison = -1;
                }
                return comparison;
            });
            console.log(questionArray)
            return questionArray.map((question) => (
                //return fetchedData.data.map((card) => (
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
                            <Button size="small">View</Button>
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
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Create new question</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 1 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {questions()}
                    </Grid>
                </Container>
            </main>
        </div>
    );
}