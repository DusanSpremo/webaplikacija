import * as express from 'express';
import pesmaRoute from './pesma/pesma.route';
import userAuth from './korisnik/korisnik.route';
import ratingRoute from './rejting/rejting.route';
import kometarRoute from './komentar/komentar.route';

const router = express.Router();

router.use('/user', userAuth);
router.use('/pesma', pesmaRoute);
router.use('/rating', ratingRoute);
router.use('/comment',kometarRoute);

export default router;