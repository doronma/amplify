import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AccountContext } from './Account';
import Container from './Container'
import Banner from './Banner';

const Main = () => {
  const { getCognitoSession } = useContext(AccountContext);
  const navigate = useNavigate()
  useEffect(() => {
    getCognitoSession().then((session) => {
      console.log(session)
    }, (err) => {
      navigate('/Login')
    })
  }, [getCognitoSession,navigate]);

  return (
    <div>
      <Banner />
      <Container></Container>
    </div>

  );
};

export default Main;