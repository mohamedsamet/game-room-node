import { UserDto } from '../dto/user/user.dto';
import { DB_ERROR } from '../constants/errors-code.constant';
import UserRepoModel from './db-models/user-repo-model';

async function addUser(userDto: UserDto): Promise<void> {
  try {
    const user = getUserRepModel(userDto);
    await user.save();
  } catch (e) {
    throw Error(DB_ERROR)
  }
}

function getUserRepModel(userDto: UserDto) {
  return new UserRepoModel({
    pseudo: userDto.pseudo,
    id: userDto.id,
    hash: userDto.hash
  });
}

export {addUser};
