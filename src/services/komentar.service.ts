import { getRepository } from 'typeorm';
import constants from '../constants';
import { Korisnik } from '../entity/korisnik.entity';
import { Pesma } from '../entity/pesma.entity';
import { Komentar } from '../entity/komenentar.entity';

const addComment = async (idPesma: number, tekst_komentara: string, token: any) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    
    let noviKomentar = new Komentar();

    const pesma: Pesma = new Pesma();
    pesma.id = idPesma;

    const korisnik: Korisnik = new Korisnik();
    korisnik.id = korisnikId;

    noviKomentar.tekst_komentara  = tekst_komentara;
    noviKomentar.korisnik = korisnik;
    noviKomentar.pesma = pesma;

    return getRepository(Komentar).save(noviKomentar);
};



export default {
    addComment
};