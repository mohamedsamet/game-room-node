import mongoose, { Schema, Document } from 'mongoose';
import { ROOMS_COLLECTION } from '../../constants/database.constant';

export interface IRoomResult {
  total: string;
  rooms: IRoom[];
}

export interface IRoom extends Document {
  name: string;
  createdBy: string;
  createdByUserId: string;
  createdAt: string;
  users: string[];
}

export const roomSchema: Schema = new Schema({
  name: {type: String, unique: true},
  createdBy: String,
  createdByUserId: String,
  createdAt: String,
  users: [String]
});

const RoomRepoModel = mongoose.model<IRoom>('RoomRepoModel', roomSchema, ROOMS_COLLECTION);

export default RoomRepoModel;
