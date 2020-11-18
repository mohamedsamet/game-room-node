import express from 'express';
import { userUrl } from '../server-urls';
import { userService } from '../../services/user.service';

const authServer = express();

authServer.use('*', (req, res, next) => {
  if (req.originalUrl !== userUrl) {
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
