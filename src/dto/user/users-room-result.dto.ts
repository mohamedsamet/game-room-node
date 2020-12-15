import { UserDto } from './user.dto';

export interface UsersRoomResultDto {
  users: UserDto[];
  roomId: number;
}
