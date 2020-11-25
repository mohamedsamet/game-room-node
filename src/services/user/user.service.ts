import { UserDto } from '../../dto/user/user.dto';
import { bcryptService } from './bcrypt.service';
import { CONFLICT_CODE, INAUTHORIZED_CODE, NOT_FOUND_CODE } from '../../constants/errors-code.constant';

let users: UserDto[] = [];
function loginUser(user: UserDto): UserDto {
  if (checkIfPseudoExist(user.pseudo)) {
    throw new Error(CONFLICT_CODE);
  } else {
    user.hash = bcryptService.hashPseudo(user.pseudo);
    user.id = users.length + 1;
    users.push(user)
  }
  return user;
}

function getUserLogged(hash: string): UserDto {
  const userFound = users.find(user => user.hash === hash.toString());
  if (userFound) {
    return  userFound;
  } else {
    throw new Error(INAUTHORIZED_CODE);
  }
}

function disconnectUser(hash: string): void {
  const userFound = users.find(user => user.hash === hash.toString());
  if (userFound) {
    users = users.filter(user => user.hash !== hash);
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function checkIfUserExist(hash: string): boolean {
  return users.some(user => user.hash === hash);
}

function checkIfPseudoExist(pseudo: string): boolean {
  return users.some(user => user.pseudo === pseudo);
}

const userService = {loginUser, getUserLogged, disconnectUser, checkIfUserExist};
export {userService};
