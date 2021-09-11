import httpStatusCodes from 'http-status-codes';

import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';
import pesmaService from '../services/pesma.service';
import constants from '../constants';
import { extractTokenFromRequest } from '../utilities/apiUtilities';
import { verifyToken } from '../utilities/encryptionUtils';

const getAllSongsOrderedByRaiting: IController = async (req, res) => {
  const pesme = await pesmaService.getAllSongsOrderedByRaiting();
  apiResponse.result(res, pesme, httpStatusCodes.OK);
};

const getAllSongsOrderedByRaitingForUser: IController = async (req, res) => {
  const authorizationHeader: string | null = extractTokenFromRequest(
    req
  );
  if (!authorizationHeader) {
    apiResponse.error(
      res,
      httpStatusCodes.UNAUTHORIZED,
      constants.ErrorCodes.INVALID_CREDENTIALS,
    );
    return;
  }
  const token = await verifyToken(authorizationHeader.substring(7));
  const pesme = await pesmaService.getAllSongsOrgeredByRaitingForUser(token);
  apiResponse.result(res, pesme, httpStatusCodes.OK);
};

const self: IController = async (req, res) => {
    apiResponse.result(res, req.body, httpStatusCodes.OK);
};
const addSong: IController = async (req, res) => {
    let pesma;
    const authorizationHeader: string | null = extractTokenFromRequest(
      req
    );
    if (!authorizationHeader) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_ADDING_ENTITY,
      );
      return;
    }
    const token = await verifyToken(authorizationHeader.substring(7));

    try {
      pesma = await pesmaService.addSong(
        req.body.nazivpesme,
        req.body.imeautora,
        req.body.nazivizvodjaca,
        req.body.tekst,
        token
      );
    } catch (e) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_ADDING_ENTITY,
      );
      return;
    }
    if (pesma) {
      apiResponse.result(res, pesma, httpStatusCodes.CREATED);
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  };

  const updateSong: IController = async (req, res) => {
    let pesma;
    const authorizationHeader: string | null = extractTokenFromRequest(
      req
    );
    if (!authorizationHeader) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_ADDING_ENTITY,
      );
      return;
    }
    const token = await verifyToken(authorizationHeader.substring(7));

    try {
      pesma = await pesmaService.updateSong(
        +req.params.idPesma,
        req.body.nazivpesme,
        req.body.imeautora,
        req.body.nazivizvodjaca,
        req.body.tekst,
        token
      );
    } catch (e) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_UPDATING_ENTITY,
      );
      return;
    }
    if (pesma) {
      apiResponse.result(res, pesma, httpStatusCodes.OK);
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
  };

  const deleteSong: IController = async (req, res) => {
    const authorizationHeader: string | null = extractTokenFromRequest(
      req
    );
    if (!authorizationHeader) {
      apiResponse.error(
        res,
        httpStatusCodes.UNAUTHORIZED,
        constants.ErrorCodes.INVALID_CREDENTIALS,
      );
      return;
    }
    const token = await verifyToken(authorizationHeader.substring(7));
    try {
      const idPesma: number = + req.params.idPesma;
      const obrisanaPesma = await pesmaService.deleteSong(idPesma, token);
      apiResponse.result(res, obrisanaPesma, httpStatusCodes.OK);

    } catch (e) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        constants.ErrorCodes.EROR_WHILE_DELETING_ENTITY,
      );
      return;
    }
    
  };
export default {
    self,
    getAllSongsOrderedByRaiting,
    getAllSongsOrderedByRaitingForUser,
    addSong,
    deleteSong,
    updateSong
};