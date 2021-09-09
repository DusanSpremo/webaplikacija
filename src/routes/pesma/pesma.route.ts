import express from 'express';
import { celebrate } from 'celebrate';
import pesmaSchema from '../../constants/schema/pesma.schema';

const router = express.Router();
import pesmaControllers from '../../controllers/pesma.controllers';

router.get(
  '/allSongs',
  pesmaControllers.getAllSongs
)

router.delete(
    '/deleteSong/:idPesma',
    pesmaControllers.deleteSong
  )


router.post('/addSong',
celebrate(pesmaSchema.addSong),
pesmaControllers.addSong)

export default router;