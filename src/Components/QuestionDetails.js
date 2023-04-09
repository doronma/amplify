import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

import { getUuid, getCurrentTime, parseDate } from "../utils/formUtils"
import { AccountContext } from './Account';

const QuestionDetails = () => {

    const { getCognitoSession } = useContext(AccountContext);
    //const [currentSession, setCurrentSession] = useState(null)
    const [userName, setUserName] = useState("")

    let { id } = useParams();
    const navigate = useNavigate()

    const backToQuestions = () => {
        navigate('/Main');
    };


    const url_question = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions/" + id + "/details"
    const url_answeres = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions/" + id + "/answers"
    const url_new_question = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/answers/" + id
    const [fetchedAnsweres, setFetchedAnsweres] = useState([]);
    const [showCreateAnswer, setShowCreateAnswer] = useState(false)
    const [fetchQuestion, setFetchQuestion] = useState()

    const getAnsweres = async () => {
        const result = await axios.get(url_answeres)
        setFetchedAnsweres(result);
    };
    useEffect(() => {

        getCognitoSession().then((session) => {
            console.log(session)
            //setCurrentSession(session)
            setUserName(session.user.userName)
        }, (err) => {
        })

        const getQuestionDetails = async () => {
            const result = await axios.get(url_question)
            setFetchQuestion(result);
        }
        getQuestionDetails();
        getAnsweres();


    }, []);

    const QuestionDetails = () => {
        if (fetchQuestion && fetchQuestion.data) {
            let question = fetchQuestion.data
            return (
                <div>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                <NotListedLocationIcon /> Question
                            </Typography>
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
                                <CreateAnswerButton/>
                            </Card>
                        </Box>
                    </Container>
                </div>
            )
        }
    }

    const CreateAnswerButton = () => {
        if (!showCreateAnswer) {
            return (
                <CardActions>
                    <Button size="small" onClick={addAnswer}>Create Answer</Button>
                </CardActions>

            )
        }
    }

    const addAnswer = () => {
        setShowCreateAnswer(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const answer = {
            QuestionID: id,
            date: getCurrentTime(),
            message: data.get('answer'),
            teacherName: data.get('user'),
            AnswerID: data.get('id')
        }
        const getData = async () => {
            const result = await axios.post(url_new_question, answer, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(result)
            getAnsweres();
            setShowCreateAnswer(false)
        };
        getData();
    }

    const AnswerForm = () => {
        if (showCreateAnswer) {
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
                            <Typography component="h1" variant="h5">
                                Create Answer
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
                                    value={userName}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="answer"
                                    name="answer"
                                    label="answer"
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
            )
        }
    }

    const AnswertTitle = () => {
        if (!showCreateAnswer && fetchedAnsweres.data && fetchedAnsweres.data.length > 0) {
            return (
                <Box sx={{
                    marginTop: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Container maxWidth="sm">

                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            <LibraryBooksIcon /> Answers
                        </Typography>
                    </Container>
                </Box>
            )
        }
    }

    const Answers = () => {
        if (fetchedAnsweres.data && !showCreateAnswer) {

            let answerArray = fetchedAnsweres.data
            answerArray.sort((a, b) => {
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

            return answerArray.map((answer) => (
                <Grid item key={answer.AnswerID} xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {answer.AnswerID}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {answer.date}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {answer.teacherName}
                            </Typography>
                            <Typography>
                                {answer.message}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))

        }
    }

    const BackToQuestionsButton = () => {
        if (!showCreateAnswer) {
            return (
                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant="contained" onClick={backToQuestions}>Back to Questions</Button>
                    </Stack>
                </Container>
            )
        }
    }

    return (
        <div>
            <CssBaseline />
            <main>
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
                            Question Details
                        </Typography>
                    </Container>
                </Box>
                <QuestionDetails/>
                <AnswertTitle/>
                <Container sx={{ py: 1 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Answers/>
                    </Grid>
                </Container>
                <BackToQuestionsButton/>
                <AnswerForm/>
            </main>
        </div>
    );
}

export default QuestionDetails