import { DeleteResult, getRepository } from 'typeorm';
import constants from '../constants';
import { Korisnik } from '../entity/korisnik.entity';
import { Pesma } from '../entity/pesma.entity';
import { RejtingPesme } from '../entity/rejting_pesme.entity';

const getAllSongsOrderedByRaiting = async () => {
  try {
    const result = await getRepository(Pesma).createQueryBuilder("pesma")
    .addSelect("CONCAT(korisnik.ime, ' ', korisnik.prezime)", "imePrezimeKorisnika")
    .addSelect("AVG(COALESCE(rejting_pesme.rejting, 0))", "avgRejting")
    .leftJoin(RejtingPesme, "rejting_pesme", "pesma.id = rejting_pesme.pesma")
    .leftJoin(Korisnik, "korisnik", "pesma.korisnikId = korisnik.id")
    .groupBy("pesma.id")
    .orderBy("avgRejting", "DESC").getRawMany();
    console.log(result);
    return mapRawData(result);
  } catch (e) {
    return null;
  }
};

const getAllSongsOrgeredByRaitingForUser = async (token: any) => {
  try {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const result = await getRepository(Pesma).createQueryBuilder("pesma")
    .addSelect("CONCAT(korisnik.ime, ' ', korisnik.prezime)", "imePrezimeKorisnika")
    .addSelect("AVG(COALESCE(rejting_pesme.rejting, 0))", "avgRejting")
    .where("pesma.korisnikId = :korisnikId", {korisnikId})
    .leftJoin(RejtingPesme, "rejting_pesme", "pesma.id = rejting_pesme.pesma")
    .leftJoin(Korisnik, "korisnik", "pesma.korisnikId = korisnik.id")
    .groupBy("pesma.id")
    .orderBy("avgRejting", "DESC").getRawMany();
    console.log(result);
    return mapRawData(result);
  } catch (e) {
    return null;
  }
};

 const addSong = async (
  nazivpesme: string,
  imeautora: string,
  nazivizvodjaca: string,
  tekst: string,
  token: any
  ) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const newPesma = new Pesma();
    newPesma.naziv_pesme = nazivpesme;
    newPesma.ime_autora = imeautora;
    newPesma.naziv_izvodjaca = nazivizvodjaca;
    newPesma.tekst = tekst;
    const korisnik = new Korisnik();
    korisnik.id = korisnikId;
    newPesma.korisnik = korisnik
    const sacuvanaPesma: Pesma= await getRepository(Pesma).save(newPesma);
    return sacuvanaPesma;
};

const updateSong = async (
  idPesma: number,
  nazivpesme: string,
  imeautora: string,
  nazivizvodjaca: string,
  tekst: string,
  token: any
  ) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const pronadenaPesma = await getRepository(Pesma).findOne({id: idPesma});
    console.log(pronadenaPesma);
    if (pronadenaPesma === null) {
      return constants.ErrorCodes.EROR_WHILE_UPDATING_ENTITY;
    }
    if (pronadenaPesma?.korisnik.id !== korisnikId) {
      return constants.ErrorCodes.USER_IS_NOT_OWNER_OF_SPECIFIED_SONG;
    }
    pronadenaPesma.naziv_pesme = nazivpesme;
    pronadenaPesma.ime_autora = imeautora;
    pronadenaPesma.naziv_izvodjaca = nazivizvodjaca;
    pronadenaPesma.tekst = tekst;
    return await getRepository(Pesma).save(pronadenaPesma);
};
    
const deleteSong = async (
  idPesma: number,
  token: any
  ) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const pronadenaPesma = await getRepository(Pesma).findOne({id: idPesma});
    if (pronadenaPesma === null) {
      return constants.ErrorCodes.EROR_WHILE_DELETING_ENTITY;
    }
    if (pronadenaPesma?.korisnik.id !== korisnikId) {
      return constants.ErrorCodes.USER_IS_NOT_OWNER_OF_SPECIFIED_SONG;
    }
    const obrisanaPesma: DeleteResult= await getRepository(Pesma).delete(idPesma);
    return obrisanaPesma;
};

const mapRawData = (data: any[]) => {
  const mappedSongsWithRating = new Array();
  data.forEach(element => {
    const pesma: Pesma = new Pesma();
    pesma.id = element.pesma_id;
    pesma.naziv_pesme = element.pesma_naziv_pesme;
    pesma.naziv_izvodjaca = element.pesma_naziv_izvodjaca;
    pesma.ime_autora = element.pesma_ime_autora;
    pesma.tekst = element.pesma_tekst;
    const zaokruzenRejting = parseFloat(element.avgRejting).toFixed(2);
    mappedSongsWithRating.push({...pesma, rejtingPesme: zaokruzenRejting, imePrezimeKorisnika: element.imePrezimeKorisnika})
  });
  return mappedSongsWithRating;
}

export default {
  addSong,
  deleteSong,
  updateSong,
  getAllSongsOrderedByRaiting,
  getAllSongsOrgeredByRaitingForUser
};