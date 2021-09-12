import { getRepository } from 'typeorm';
import { KorisnikInfo } from '../dto/korisnik-info.dto';
import { Korisnik } from '../entity/korisnik.entity';

const getUserById = async (userId: number) => {
  try {
    return await 
      await getRepository(Korisnik).findOne({id: userId});
  } catch (e) {
    return null;
  }
};

const login = async (
  korisnickoIme: string,
  sifra: string
) : Promise<Korisnik | null> => {
  try {
    console.log (korisnickoIme);
    const pronadeniKorisnik: Korisnik | undefined = await getRepository(Korisnik).findOne({ korisnicko_ime : korisnickoIme, sifra });
    if (pronadeniKorisnik === undefined) {
      return null;
    }
    return pronadeniKorisnik;
  } catch(e) {
    console.error(e);
  }
  return null;
};

const createKorisnik = async (
  korisnickoime: string,
  sifra: string,
  ime: string,
  prezime: string,
  email: string
) => {
  const newKorisnik = new Korisnik();
  newKorisnik.korisnicko_ime = korisnickoime;
  newKorisnik.sifra = sifra;
  newKorisnik.ime = ime;
  newKorisnik.prezime = prezime;
  newKorisnik.email = email;
  const sacuvaniKorisnik: Korisnik = await getRepository(Korisnik).save(newKorisnik);
  return new KorisnikInfo(sacuvaniKorisnik.korisnicko_ime, sacuvaniKorisnik.ime, sacuvaniKorisnik.prezime, sacuvaniKorisnik.email);
};

export default {
  createKorisnik,
  getUserById,
  login,
};