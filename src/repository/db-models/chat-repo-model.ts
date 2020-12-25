import mongoose, { Schema, Document } from 'mongoose';
import { CHAT_COLLECTION, USERS_COLLECTION } from '../../constants/database.constant';

export interface IChat extends Document {
  roomId: string;
  pseudo: string;
  userId: string;
  message: string;
  dateTime: string;
}

export const chatSchema: Schema = new Schema({
  roomId: String,
  pseudo: String,
  userId: String,
  message: String,
  dateTime: String
});

const ChatRepoModel = mongoose.model<IChat>('ChatRepoModel', chatSchema, CHAT_COLLECTION);

export default ChatRepoModel;
