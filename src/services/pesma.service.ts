import { DeleteResult, getRepository } from 'typeorm';
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
 const addSong = async (
    nazivpesme: string,
    imeautora: string,
    nazivizvodjaca: string,
    tekst: string
    ) => {
        const newPesma = new Pesma();
        newPesma.naziv_pesme = nazivpesme;
        newPesma.ime_autora = imeautora;
        newPesma.naziv_izvodjaca = nazivizvodjaca;
        newPesma.tekst = tekst;
        const sacuvanaPesma: Pesma= await getRepository(Pesma).save(newPesma);
        return sacuvanaPesma;
    };
    
const deleteSong = async (
    idPesma: number
    ) => {
        const obrisanaPesma: DeleteResult= await getRepository(Pesma).delete(idPesma);
        return obrisanaPesma;
    };


export default {
  getAllSongs,
  addSong,
  deleteSong
};