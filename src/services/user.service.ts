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

function checkIfPseudoExist(pseudo: string): boolean {
  return users.some(user => user.pseudo === pseudo);
}

const userService = {loginUser};
export {userService};
