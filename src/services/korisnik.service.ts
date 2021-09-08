import { getRepository } from 'typeorm';
import { Korisnik } from '../entity/korisnik.entity';

const getUserById = async (userId: number) => {
  try {
    return await 
      await getRepository(Korisnik).findOne({ id: userId });
  } catch (e) {
    return null;
  }
};


const createUser = async (
  korisnickoime: string,
  sifra: string,
  ime: string,
  prezime: string = '',
) => {
  const newKorisnik = new Korisnik();
  newKorisnik.korisnicko_ime = korisnickoime;
  newKorisnik.sifra = sifra;
  newKorisnik.ime = ime;
  newKorisnik.prezime = prezime;
  return await getRepository(Korisnik).save(newKorisnik);
};

export default {
  createUser,
    getUserById,
};