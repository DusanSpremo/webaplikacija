import express from 'express';

import userController from '../../controllers/korisnik.controllers';
import korisnikSchema from '../../constants/schema/korisnik.schema';

const router = express.Router();
import { celebrate } from 'celebrate';

router.post(
  '/register',
  celebrate(korisnikSchema.register),
  userController.register,
);

router.post(
  '/login',
  celebrate(korisnikSchema.login),
  userController.login,
);



export default router;