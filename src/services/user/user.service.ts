import { userRepository } from '../../repository/user.repository';
import { IUser } from '../../repository/db-models/user-repo.model';

async function loginUser(pseudo: string): Promise<IUser> {
  return userRepository.addUser(pseudo);
}

async function getUserLogged(id: string): Promise<IUser> {
  return userRepository.getUserById(id);
}

function disconnectUser(id: string): Promise<IUser> {
  return userRepository.removeUserById(id);
}

const userService = {loginUser, getUserLogged, disconnectUser};
export {userService};
