import { Route, Routes } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import QuestionGrid from './QuestionGrid';
import QuestionList from './QuestionList';
import CreateQuestion from './CreateQuestion';
import QuestionDetails from './QuestionDetails';


const theme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                yaara.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Container() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<QuestionGrid />} />
                    <Route path="/Grid" element={<QuestionGrid />} />
                    <Route path="/Table" element={<QuestionList />} />
                    <Route path="/CreateQuestion" element={<CreateQuestion />} />
                    <Route path="/QuestionDetails/:id" element={<QuestionDetails />} />
                </Routes>
                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Physicis QA
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Created By Yaara Marcus
                    </Typography>
                    <Copyright />
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default Container;