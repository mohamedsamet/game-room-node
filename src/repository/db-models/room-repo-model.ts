import mongoose, { Schema, Document } from 'mongoose';
import { ROOMS_COLLECTION } from '../../constants/database.constant';

export interface IRoom extends Document {
  name: string;
  createdBy: string;
  createdByUserHash: string;
  users: string[];
}

export const roomSchema: Schema = new Schema({
  name: {type: String, unique: true},
  createdBy: String,
  createdByUserHash: String,
  users: [String]
});

const RoomRepoModel = mongoose.model<IRoom>('RoomRepoModel', roomSchema, ROOMS_COLLECTION);

export default RoomRepoModel;
