import { UserDto } from '../dto/user/user.dto';
import { bcryptService } from './bcrypt.service';

function loginUser(user: UserDto): UserDto {
  user.hash = bcryptService.hashPseudo(user.pseudo);
  return user;
}

const userService = {loginUser};
export {userService};
