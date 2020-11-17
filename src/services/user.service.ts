import { UserDto } from '../dto/user/user.dto';
import { bcryptService } from './bcrypt.service';

const users: UserDto[] = [];
function loginUser(user: UserDto): UserDto {
  if (checkIfPseudoExist(user.pseudo)) {
    throw new Error('409');
  } else {
    user.hash = bcryptService.hashPseudo(user.pseudo);
    users.push(user)
  }
  return user;
}

function getUserLogged(hash: string): UserDto {
  const userFound = users.find(user => user.hash === hash.toString());
  if (userFound) {
    return  userFound;
  } else {
    throw new Error('403');
  }
}

function checkIfPseudoExist(pseudo: string): boolean {
  return users.some(user => user.pseudo === pseudo);
}

const userService = {loginUser, getUserLogged};
export {userService};
