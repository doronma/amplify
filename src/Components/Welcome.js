import { useNavigate } from 'react-router-dom';
import Banner from './Banner';
import physics_image from '../assets/physics_650x400.jpg'
import Button from '@mui/material/Button';


function Welcome() {
  const navigate = useNavigate()

  const start = () => {

    navigate('/Main');
  };

  return (
    <div>
      <Banner />

      <div style={{ margin: '100px' }}>
        <h2><center>Welcome to Phyisics QA</center></h2>
        <br></br>
        <Button style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} onClick={start}>
          <img src={physics_image} alt="physicis" />
          Lets Go...</Button>
      </div></div>
  );
}

export default Welcome;