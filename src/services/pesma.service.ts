import { getRepository } from 'typeorm';
import { Pesma } from '../entity/pesma.entity';

const getAllSongs = async () => {
  try {
    return await getRepository(Pesma).find({order: {
         id: "ASC"
    }});
  } catch (e) {
    return null;
  }
};


export default {
  getAllSongs
};