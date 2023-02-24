

import axios from "axios";
import { useEffect, useState } from "react";



function QuestionList() {
    const url = "https://pwqmfe6648.execute-api.eu-central-1.amazonaws.com/dev/questions"
    const [fetchedData, setFetchedData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(url)

            setFetchedData(data);
        };
        getData();
    }, []);

    const questions = () => {
        if (fetchedData.data) {
            const questionArray = fetchedData.data
            return questionArray.map(function (question) {
                return <tr key={question.QuestionID}>
                    
                    <td>{question.QuestionID} </td>
                    <td>{question.date} </td>
                    <td>{question.userName} </td>
                    <td>{question.message} </td>
                    
                </tr>
            })
            
        }
    }

    console.log("data: ", fetchedData);

    return (
        <div>
            <div style={{ margin: '100px' }}>

                <br></br>
                <table border="1">
                    <thead>
                        <tr><td>Question ID</td><td>Date</td><td>User Name</td><td>Question</td></tr>
                    </thead>
                    <tbody>
                    {questions()}
                    </tbody>
                </table>


            </div>

        </div>
    );
}

export default QuestionList;