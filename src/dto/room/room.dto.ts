import { UserDto } from '../user/user.dto';

export interface RoomDto {
  id: number;
  name: string;
  createdBy: string;
  createdByUserId: string;
  createdAt: string;
  users: UserDto[];
}
