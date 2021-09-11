import express from 'express';
import httpStatusCodes from 'http-status-codes';

import userService from '../services/korisnik.service';
import apiResponse from '../utilities/apiResponse';
import { verifyToken } from '../utilities/encryptionUtils';
import { extractTokenFromRequest } from '../utilities/apiUtilities';
import application from '../constants/application';
import Constants from '../constants';

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    application.authorizationIgnorePath.indexOf(
      `${req.originalUrl}`,
    ) === -1
  ) {
    const authorizationHeader: string | null = extractTokenFromRequest(
      req
    );
    if (authorizationHeader) {
      const decoded = await verifyToken(authorizationHeader.substring(7));
      if (decoded) {
        const user = await userService.getUserById(
          decoded.data[Constants.Cookie.KEY_USER_ID],
        );
        if(!user) {
          apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
          return;
        }
      } else {
        apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        return;
      }
    } else {
      apiResponse.error(res, httpStatusCodes.FORBIDDEN);
      return;
    }
  }
  next();
};