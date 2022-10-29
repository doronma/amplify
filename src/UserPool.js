import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: 'us-east-1_J6A612pMe',
  ClientId: '3pdovvargot9mio3fdmlq2dijj',
};
export default new CognitoUserPool(poolData);