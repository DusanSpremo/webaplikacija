import { Request } from 'express';
import { Korisnik } from '../entity/korisnik.entity';

export default interface IRequest extends Request {
  user: Korisnik;
  dashboard: boolean;
}