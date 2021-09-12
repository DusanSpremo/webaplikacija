import { getRepository } from 'typeorm';
import constants from '../constants';
import { Korisnik } from '../entity/korisnik.entity';
import { Pesma } from '../entity/pesma.entity';
import { RejtingPesme } from '../entity/rejting_pesme.entity';

const addSongRating = async (idPesma: number, rating: number, token: any) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const postojeciRejting = await getRepository(RejtingPesme).createQueryBuilder()
    .where("pesmaId = :idPesma", {idPesma})
    .andWhere("korisnikId = :korisnikId", {korisnikId})
    .getOne();
    if (postojeciRejting) {
        return constants.ErrorCodes.USER_RATING_FOR_SPECIFIED_SONG_EXISTS;
    }
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


const updateSongRating = async (idPesma: number, rating: number, token: any) => {
    const korisnikId: number = token.data[constants.Cookie.KEY_USER_ID];
    const postojeciRejting = await getRepository(RejtingPesme).createQueryBuilder()
    .where("pesmaId = :idPesma", {idPesma})
    .andWhere("korisnikId = :korisnikId", {korisnikId})
    .getOne();
    if (!postojeciRejting) {
        return constants.ErrorCodes.EROR_WHILE_UPDATING_ENTITY;
    }
    postojeciRejting.rejting = rating;

    return getRepository(RejtingPesme).save(postojeciRejting);
};

export default {
    addSongRating,
    updateSongRating
};