import mongoose, { Schema, Document } from 'mongoose';
import { USERS_COLLECTION } from '../../constants/database.constant';

export interface IUser extends Document {
  pseudo: string;
}

export interface IUserWriter extends IUser {
  roomId: string;
}

export interface IUsersRoomResult {
  users: IUser[];
  roomId: string;
}

export const userSchema: Schema = new Schema({
  pseudo: {type: String, unique: true},
});

const UserRepoModel = mongoose.model<IUser>('UserRepoModel', userSchema, USERS_COLLECTION);

export default UserRepoModel;
