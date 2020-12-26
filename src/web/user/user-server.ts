import bodyParser from 'body-parser';
import { USER_URL } from '../../constants/api-const';
import { UserDto } from '../../dto/user/user.dto';
import { userService } from '../../services/user/user.service';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import express from 'express';
import {
  ADD_NEW_USER_LOG, DISCONNECT_USER_LOG, GET_LOGGED_USER_LOG, INAUTHORIZED_CONNECTION_LOG, RED_ERR_COLOR, USER_NOT_FOUND_LOG
} from '../../constants/logs.constant';
import { INAUTHORIZED_CODE, NOT_FOUND_CODE } from '../../constants/errors-code.constant';

const userServer = express();
const jsonParse = bodyParser.json();

/** Add new user with pseudo */
userServer.post(USER_URL, jsonParse, (req, res) => {
  const request: UserDto = req.body;
  userService.loginUser(request.pseudo).then(user => {
    res.send(user);
    console.log(ADD_NEW_USER_LOG, ' id: ' + user._id);
  }).catch(error => {
    return errorHandlingService.getDbErrorResponse(res, error)
  })
});

/** Get logged user with id */
userServer.get(USER_URL, jsonParse, (req, res) => {
  const id = req.headers.authorization;
  userService.getUserLogged(id).then(user => {
    if (user) {
      res.send(user);
      console.log(GET_LOGGED_USER_LOG, ' id: ' + user._id);
    } else {
      console.log(INAUTHORIZED_CONNECTION_LOG);
      return errorHandlingService.getResponse(res, Error(INAUTHORIZED_CODE));
    }
  }).catch(error => {
    return errorHandlingService.getDbErrorResponse(res, error)
  })
});

/** Disconnect user with id */
userServer.delete(USER_URL, jsonParse, (req, res) => {
  const id = req.headers.authorization;
  userService.disconnectUser(id).then(user => {
    if (user) {
      res.send(user);
      console.log(DISCONNECT_USER_LOG, ' id: ' + user._id);
    } else {
      console.log(USER_NOT_FOUND_LOG);
      return errorHandlingService.getResponse(res, Error(NOT_FOUND_CODE));
    }
  }).catch(error => {
    return errorHandlingService.getDbErrorResponse(res, error)
  })
});

export {userServer}
