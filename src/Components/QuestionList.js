import { useEffect, useState } from "react";

import axios from "axios";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function QuestionList() {
    const url = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions"
    const [fetchedData, setFetchedData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(url)

            setFetchedData(result);
        };
        getData();
    }, []);

    const Questions = () => {
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
            return questionArray.map(function (question) {
                return <StyledTableRow key={question.QuestionID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell align="left">{question.QuestionID}</StyledTableCell >
                    <StyledTableCell align="left">{question.date}</StyledTableCell >
                    <StyledTableCell align="left">{question.userName}</StyledTableCell >
                    <StyledTableCell align="left">{question.message}</StyledTableCell >

                </StyledTableRow>
            })

        }
    }


    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Question ID</StyledTableCell >
                            <StyledTableCell align="left">Date</StyledTableCell >
                            <StyledTableCell align="left">User Name</StyledTableCell >
                            <StyledTableCell align="left">Question</StyledTableCell >
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Questions/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default QuestionList;