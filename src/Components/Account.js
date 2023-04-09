import { createContext } from 'react';

import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from '../UserPool';

const AccountContext = createContext();

const Account = (props) => {

  const getCognitoSession = () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = UserPool.getCurrentUser();
      if (!cognitoUser){
        reject(new Error('No User'))
      }

      cognitoUser.getSession((err, result) => {
        if (err || !result) {
          reject(new Error('Failure getting Cognito session: ' + err))
          return
        }

        // Resolve the promise with the session credentials
        console.debug('Successfully got session: ' + JSON.stringify(result))
        const session = {
          credentials: {
            accessToken: result.accessToken.jwtToken,
            idToken: result.idToken.jwtToken,
            refreshToken: result.refreshToken.token
          },
          user: {
            userName: result.idToken.payload['cognito:username'],
            email: result.idToken.payload.email
          }
        }
        resolve(session)
      })
    })
  }

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('login success', result);
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  };

  return (
    <AccountContext.Provider value={{ authenticate, getCognitoSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };