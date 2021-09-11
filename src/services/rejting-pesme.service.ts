import { getRepository } from 'typeorm';
import constants from '../constants';
import { Korisnik } from '../entity/korisnik.entity';
import { Pesma } from '../entity/pesma.entity';
import { RejtingPesme } from '../entity/rejting_pesme.entity';

const addSongRating = async (idPesma: number, rating: number, token: any) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    let noviRejting = new RejtingPesme();

    const pesma: Pesma = new Pesma();
    pesma.id = idPesma;

    const korisnik: Korisnik = new Korisnik();
    korisnik.id = korisnikId;

    noviRejting.rejting = rating;
    noviRejting.korisnik = korisnik;
    noviRejting.pesma = pesma;

    return getRepository(RejtingPesme).save(noviRejting);
};

export default {
    addSongRating
};