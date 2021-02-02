import express from 'express';
import {USER_URL, VERSION_URL} from '../../constants/api.constant';
import { userService } from '../../services/user/user.service';
import { INAUTHORIZED_CONNECTION_LOG } from '../../constants/logs.constant';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import { INAUTHORIZED_CODE } from '../../constants/errors-code.constant';

const authServer = express();

authServer.use('*', async (req, res, next) => {
  if (req.originalUrl !== USER_URL && req.originalUrl !== VERSION_URL) {
    if (req.method === 'OPTIONS') {
      next();
    } else {
      const id = req.headers.authorization;
      if (!await userService.getUserLogged(id)) {
        console.log(INAUTHORIZED_CONNECTION_LOG);
        return errorHandlingService.getResponse(res, Error(INAUTHORIZED_CODE));
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export {authServer};
