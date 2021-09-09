import * as express from 'express';

import userAuth from './korisnik/korisnik.route';

const router = express.Router();

router.use('/user', userAuth);

export default router;