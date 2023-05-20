import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import { Account } from './Components/Account';
import Main from './Components/Main';
import Welcome from './Components/Welcome';
import Signup from './Components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Account>
        <Routes>
          <Route path="/" element={<Welcome />} exact />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Main/*" element={<Main />} />
        </Routes>
      </Account>
    </BrowserRouter>
  );
}

export default App;