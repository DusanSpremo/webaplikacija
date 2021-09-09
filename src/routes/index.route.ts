import * as express from 'express';
import pemsaRoute from './pesma/pesma.route';
import userAuth from './korisnik/korisnik.route';

const router = express.Router();

router.use('/user', userAuth);
router.use('/pesma', pemsaRoute)

export default router;