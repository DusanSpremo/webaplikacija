import httpStatusCodes from 'http-status-codes';

import userService from '../services/korisnik.service';
import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';
import constants from '../constants';
import { generateJWTToken } from '../utilities/encryptionUtils';

const login: IController = async (req, res) => {
  const user = await userService.login(
    req.body.korisnickoime,
    req.body.sifra,
  );
  if (user) {
    const responseContent = {
      token: await generateJWTToken(
        constants.Cookie.KEY_USER_ID,
        user.id,
      )
    };
    apiResponse.result(res, responseContent, httpStatusCodes.OK);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      constants.ErrorCodes.INVALID_CREDENTIALS,
    );
  }
};

const register: IController = async (req, res) => {
  let user;
  try {
    user = await userService.createKorisnik(
      req.body.korisnickoime,
      req.body.sifra,
      req.body.ime,
      req.body.prezime,
      req.body.email
    );
  } catch (e) {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      constants.ErrorCodes.DUPLICATE_ENTRY,
    );
    return;
  }
  if (user) {
    apiResponse.result(res, user, httpStatusCodes.CREATED);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const self: IController = async (req, res) => {
    apiResponse.result(res, req.body, httpStatusCodes.OK);
};

export default {
 register,
 self,
 login,
 
};