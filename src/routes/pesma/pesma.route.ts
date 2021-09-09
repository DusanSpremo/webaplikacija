import express from 'express';

const router = express.Router();
import pesmaControllers from '../../controllers/pesma.controllers';

router.get(
  '/allSongs',
  pesmaControllers.getAllSongs
)

export default router;