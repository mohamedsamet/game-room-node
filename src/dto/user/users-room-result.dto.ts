import { IUser } from '../../repository/db-models/user-repo-model';

export interface IUsersRoomResult {
  users: IUser[];
  roomId: string;
}
