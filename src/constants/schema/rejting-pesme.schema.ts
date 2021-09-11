import { celebrate, Joi, errors, Segments } from 'celebrate';
export default {
  addRating: {
    [Segments.BODY]: {
      rejting: Joi.number().min(1).max(5).required()
    },
  },
};