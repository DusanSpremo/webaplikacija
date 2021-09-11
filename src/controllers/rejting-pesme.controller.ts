import httpStatusCodes from 'http-status-codes';

import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';
import constants from '../constants';
import { extractTokenFromRequest } from '../utilities/apiUtilities';
import { verifyToken } from '../utilities/encryptionUtils';
import rejtingPesmeService from '../services/rejting-pesme.service';

const self: IController = async (req, res) => {
    apiResponse.result(res, req.body, httpStatusCodes.OK);
};
const addRating: IController = async (req, res) => {
    let rating;
    const authorizationHeader: string | null = extractTokenFromRequest(
      req
    );
    if (!authorizationHeader) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.INVALID_CREDENTIALS,
      );
      return;
    }
    const token = await verifyToken(authorizationHeader.substring(7));

    try {
      rating = await rejtingPesmeService.addSongRating(+req.params.idPesma, req.body.rejting, token);
    } catch (e) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_ADDING_ENTITY,
      );
      return;
    }
    if (rating) {
      apiResponse.result(res, rating, httpStatusCodes.CREATED);
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  };
export default {
    self,
    addRating
};