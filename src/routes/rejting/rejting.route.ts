import express from 'express';
import { celebrate } from 'celebrate';
import rejtingPesmeSchema from '../../constants/schema/rejting-pesme.schema';

const router = express.Router();
import rejtingPesmeController from '../../controllers/rejting-pesme.controller';

router.post('/addRating/:idPesma',
celebrate(rejtingPesmeSchema.addRating),
rejtingPesmeController.addRating)

router.put('/updateRating/:idPesma',
celebrate(rejtingPesmeSchema.addRating),
rejtingPesmeController.updateRating)

export default router;