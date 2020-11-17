import bodyParser from 'body-parser';
import { userUrl } from '../server-urls';
import { expressServer } from '../express-bean/allow-origin';
import { UserDto } from '../../dto/user/user.dto';
import { userService } from '../../services/user.service';
import { errorHandlingService } from '../../services/error-handling.service';

const userServer = expressServer;
const jsonParse = bodyParser.json();

/** Add new user with pseudo */
userServer.post(userUrl, jsonParse, (req, res) => {
  const request: UserDto = req.body;
  let response: UserDto;
  try {
    response = userService.loginUser(request);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  res.send(response);
});

/** Get logged user with hash */
userServer.get(userUrl, jsonParse, (req, res) => {
  const hash = req.headers.authorization;
  let userLogged: UserDto;
  try {
    userLogged = userService.getUserLogged(hash)
  } catch (error) {
    return errorHandlingService.getResponse(res, error)
  }
  res.send(userLogged);
});

export {userServer}
