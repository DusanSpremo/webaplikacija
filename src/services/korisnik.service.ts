import { getRepository } from 'typeorm';
import { KorisnikInfo } from '../dto/korisnik-info.dto';
import { Korisnik } from '../entity/korisnik.entity';

const getUserById = async (userId: string) => {
  try {
    return await 
      await getRepository(Korisnik).findOne({korisnicko_ime: userId});
  } catch (e) {
    return null;
  }
};

const login = async (
  korisnickoIme: string,
  sifra: string
) : Promise<KorisnikInfo | null> => {
  try {
    const pronadeniKorisnik: Korisnik | undefined = await getRepository(Korisnik).findOne({ korisnicko_ime : korisnickoIme, sifra });
    if (pronadeniKorisnik === undefined) {
      return null;
    }
    return new KorisnikInfo(pronadeniKorisnik.korisnicko_ime, pronadeniKorisnik.ime, pronadeniKorisnik.prezime);
  } catch(e) {
    console.error(e);
  }
  return null;
};

const createKorisnik = async (
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
  const sacuvaniKorisnik: Korisnik = await getRepository(Korisnik).save(newKorisnik);
  return new KorisnikInfo(sacuvaniKorisnik.korisnicko_ime, sacuvaniKorisnik.ime, sacuvaniKorisnik.prezime);
};

export default {
  createKorisnik,
  getUserById,
  login,
};