import { Request} from 'express';

const extractQueryForRequest = (req: Request, query: string) => {
  if (req.query[query]) {
    // @ts-ignore
    return JSON.parse(req.query[query]);
  }
  return [];
};

const extractTokenFromRequest = (req: Request, key: string) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
  return null;
};

export {
  extractQueryForRequest,
  extractTokenFromRequest,
};