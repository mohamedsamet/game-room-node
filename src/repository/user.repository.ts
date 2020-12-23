import { UserDto } from '../dto/user/user.dto';
import { DB_ERROR } from '../constants/errors-code.constant';
import UserModel from './db-models/user-model';

async function addUser(userDto: UserDto): Promise<void> {
  try {
    const user = new UserModel({
      pseudo: userDto.pseudo,
      id: userDto.id,
      hash: userDto.hash
    })
    await user.save();
  } catch (e) {
    throw Error(DB_ERROR)
  }
}

export {addUser};
