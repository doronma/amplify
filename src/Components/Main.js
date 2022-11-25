import { useContext, useEffect } from 'react';
import { AccountContext } from './Account';
import { useNavigate } from 'react-router-dom';
import Container from './Container'
import Banner from './Banner';

const Main = () => {
  const { getSession  } = useContext(AccountContext);
  const navigate = useNavigate()
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Session: ', session);
      })
      .catch((err) => {
        console.log('Session: ', err);
        navigate('/Login')
      });
  }, []);

  return (
    <div>
      <Banner />
      <Container></Container>
    </div>

  );
};

export default Main;