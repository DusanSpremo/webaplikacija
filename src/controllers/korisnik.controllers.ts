import httpStatusCodes from 'http-status-codes';

import userService from '../services/korisnik.service';
import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';

const register: IController = async (req, res) => {
  let user;
  try {
    user = await userService.createUser(
      req.body.email,
      req.body.password,
      req.body.name,
    );
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS,
      );
      return;
    }
  }
  if (user) {
    apiResponse.result(res, user, httpStatusCodes.CREATED);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const self: IController = async (req, res) => {
    apiResponse.result(res, req.user, httpStatusCodes.OK);
};


export default {
 register,
  self,
};