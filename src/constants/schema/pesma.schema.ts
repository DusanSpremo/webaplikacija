import { celebrate, Joi, errors, Segments } from 'celebrate';
export default {
  addSong: {
    [Segments.BODY]: {
      nazivpesme: Joi.string().min(6).max(50).required(),
      imeautora: Joi.string().min(1).max(100).required(),
      nazivizvodjaca: Joi.string().min(1).max(100).required(),
      tekst: Joi.string().min(1).required(),
    },
  },
    };