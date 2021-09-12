import express from 'express';
const router = express.Router();
import komentarController from '../../controllers/komentar.controller';

router.post('/addComment/:idPesma',
komentarController.addComment)


export default router;