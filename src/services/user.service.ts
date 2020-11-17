import { UserDto } from '../dto/user/user.dto';

function loginUser(user: UserDto): UserDto {
  return user;
}

const userService = {loginUser};
export {userService};
