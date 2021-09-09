import application from '../constants/application';

const jwt = require('jsonwebtoken');

const generateJWTToken = async (key: string, value: string) => {
  const data: { [key: string]: string } = {};
  data[key] = value;
  return await jwt.sign({ data }, application.env.authSecret, {
    expiresIn: application.timers.userCookieExpiry,
  });
};

const verifyToken = async (token: string): Promise<any> =>
  new Promise(resolve => {
    jwt.verify(
      token,
      application.env.authSecret,
      (err: Error, decoded: any) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded);
        }
      },
    );
  });

export { generateJWTToken, verifyToken };