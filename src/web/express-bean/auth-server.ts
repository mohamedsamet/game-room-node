import express from 'express';
import { USER_URL } from '../../constants/api-const';
import { userService } from '../../services/user/user.service';
import { INAUTHORIZED_CONNECTION_LOG } from '../../constants/logs.constant';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import { INAUTHORIZED_CODE } from '../../constants/errors-code.constant';

const authServer = express();

authServer.use('*', async (req, res, next) => {
  if (req.originalUrl !== USER_URL) {
    if (req.method === 'OPTIONS') {
      next();
    } else {
      const hash = req.headers.authorization;
      if (!await userService.getUserLogged(hash)) {
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
