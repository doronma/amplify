
import QuestionGrid from './QuestionGrid';
import QuestionList from './QuestionList';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                    <QuestionGrid />
                    {/* Footer */}
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
                    {/* End footer */}
                </ThemeProvider>
            </div>
    );
}

export default Container;