import httpStatusCodes from 'http-status-codes';

import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';
import pesmaService from '../services/pesma.service';

const getAllSongs: IController = async (req, res) => {
  const pesme = await pesmaService.getAllSongs();
  apiResponse.result(res, pesme, httpStatusCodes.OK);
};

const self: IController = async (req, res) => {
    apiResponse.result(res, req.body, httpStatusCodes.OK);
};

export default {
    self,
    getAllSongs
};