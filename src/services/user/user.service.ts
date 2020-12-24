import { UserDto } from '../../dto/user/user.dto';
import { bcryptService } from './bcrypt.service';
import { userRepository } from '../../repository/user.repository';
import { IUser } from '../../repository/db-models/user-repo-model';

async function loginUser(user: UserDto): Promise<IUser> {
  user.hash = bcryptService.hashPseudo(user.pseudo);
  return userRepository.addUser(user);
}

async function getUserLogged(hash: string): Promise<IUser> {
  return userRepository.getUserByHash(hash);
}

function disconnectUser(hash: string): Promise<IUser> {
  return userRepository.removeUserByHash(hash);
}

const userService = {loginUser, getUserLogged, disconnectUser};
export {userService};
