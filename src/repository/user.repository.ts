import { UserDto } from '../dto/user/user.dto';
import UserRepoModel, { IUser } from './db-models/user-repo-model';

async function addUser(userDto: UserDto): Promise<IUser> {
    const user: IUser = getUserRepModel(userDto);
    return await user.save()
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getUserByHash(hash: string): Promise<IUser> {
    return await UserRepoModel.findOne({hash})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function removeUserByHash(hash: string): Promise<IUser> {
    return await UserRepoModel.findOneAndRemove({hash})
      .then(res => res)
      .catch((e) => {throw e.message});
}

function getUserRepModel(userDto: UserDto): IUser {
  return new UserRepoModel({
    pseudo: userDto.pseudo,
    hash: userDto.hash
  });
}

const userRepository = {addUser, getUserByHash, removeUserByHash};
export {userRepository};
