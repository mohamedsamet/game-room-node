import mongoose, { Schema, Document } from 'mongoose';
import { USERS_COLLECTION } from '../../constants/database.constant';

export interface IUser extends Document {
  pseudo: string;
  hash: string;
}

export const userSchema: Schema = new Schema({
  pseudo: {type: String, unique: true},
  hash: String
});

const UserRepoModel = mongoose.model<IUser>('UserRepoModel', userSchema, USERS_COLLECTION);

export default UserRepoModel;
