import { celebrate, Joi, errors, Segments } from 'celebrate';
export default {
  register: {
    [Segments.BODY]: {
      korisnickoime: Joi.string().min(6).max(50).required(),
      sifra: Joi.string().min(6).max(250).required(),
      ime: Joi.string().min(1).max(100).required(),
      prezime: Joi.string().min(1).max(100).required(),
    },
  },
  login: {
    [Segments.BODY]: {
      korisnickoime: Joi.string().required(),
      sifra: Joi.string().required(),
    },
  }
  };