import bodyParser from 'body-parser';
import { USER_URL } from '../../constants/api-const';
import { UserDto } from '../../dto/user/user.dto';
import { userService } from '../../services/user/user.service';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import express from 'express';
import { ADD_NEW_USER_LOG, DISCONNECT_USER_LOG, GET_LOGGED_USER_LOG, RED_ERR_COLOR } from '../../constants/logs.constant';

const userServer = express();
const jsonParse = bodyParser.json();

/** Add new user with pseudo */
userServer.post(USER_URL, jsonParse, (req, res) => {
  const request: UserDto = req.body;
  try {
    userService.loginUser(request).then(user => {
      res.send(user);
      console.log(ADD_NEW_USER_LOG);
    })
  } catch (err) {
    console.log(RED_ERR_COLOR, err);
    return errorHandlingService.getResponse(res, err);
  }
});

/** Get logged user with hash */
userServer.get(USER_URL, jsonParse, (req, res) => {
  const hash = req.headers.authorization;
  let userLogged: UserDto;
  try {
    userLogged = userService.getUserLogged(hash)
  } catch (error) {
    return errorHandlingService.getResponse(res, error)
  }
  console.log(GET_LOGGED_USER_LOG);
  res.send(userLogged);
});

/** Disconnect user with hash */
userServer.delete(USER_URL, jsonParse, (req, res) => {
  const hash = req.headers.authorization;
  try {
    userService.disconnectUser(hash)
  } catch (error) {
    return errorHandlingService.getResponse(res, error)
  }
  console.log(DISCONNECT_USER_LOG);
  res.status(204).send();
});

export {userServer}
