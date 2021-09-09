import httpStatusCodes from 'http-status-codes';

import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';
import pesmaService from '../services/pesma.service';
import constants from '../constants';
import { Pesma } from '../entity/pesma.entity';

const getAllSongs: IController = async (req, res) => {
  const pesme = await pesmaService.getAllSongs();
  apiResponse.result(res, pesme, httpStatusCodes.OK);
};

const self: IController = async (req, res) => {
    apiResponse.result(res, req.body, httpStatusCodes.OK);
};
const addSong: IController = async (req, res) => {
    let pesma;
    try {
      pesma = await pesmaService.addSong(
        req.body.nazivpesme,
        req.body.imeautora,
        req.body.nazivizvodjaca,
        req.body.tekst
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

  const deleteSong: IController = async (req, res) => {
    try {
      const idPesma: number = + req.params.idPesma;
      const obrisanaPesma = await pesmaService.deleteSong(idPesma);
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
    getAllSongs,
    addSong,
    deleteSong
};