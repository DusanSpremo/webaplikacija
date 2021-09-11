import express from 'express';
import { celebrate } from 'celebrate';
import pesmaSchema from '../../constants/schema/pesma.schema';

const router = express.Router();
import pesmaControllers from '../../controllers/pesma.controllers';

router.get(
  '/allSongsOrdered',
  pesmaControllers.getAllSongsOrderedByRaiting
)

router.get(
  '/allSongsOrderedForUser',
  pesmaControllers.getAllSongsOrderedByRaitingForUser
)

router.delete(
    '/deleteSong/:idPesma',
    pesmaControllers.deleteSong
)

router.put(
  '/updateSong/:idPesma',
  celebrate(pesmaSchema.addSong),
  pesmaControllers.updateSong
)

router.post('/addSong',
celebrate(pesmaSchema.addSong),
pesmaControllers.addSong)

export default router;