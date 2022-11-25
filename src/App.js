
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import { Account } from './Components/Account';
import Status from './Components/Status';
import Banner from './Components/Banner';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <Banner />
        <Account>
          <Status />
          <BrowserRouter>
            <Routes>
           
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Account>
      </div>
    </div>
  );
}



export default App;
