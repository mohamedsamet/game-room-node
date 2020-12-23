import express from 'express';
import { USER_URL } from '../../constants/api-const';
import { userService } from '../../services/user/user.service';

const authServer = express();

authServer.use('*', (req, res, next) => {
  if (req.originalUrl !== USER_URL) {
    if (req.method === 'OPTIONS') {
      next();
    } else {
      const hash = req.headers.authorization;
      if (!userService.checkIfUserExist(hash)) {
        res.status(403).send('Not authorized');
      }
      next();
    }
  } else {
    next();
  }
});

export {authServer};
