import * as express from 'express';
import pesmaRoute from './pesma/pesma.route';
import userAuth from './korisnik/korisnik.route';

const router = express.Router();

router.use('/user', userAuth);
router.use('/pesma', pesmaRoute)

export default router;