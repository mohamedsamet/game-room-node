import mongoose, { Schema } from 'mongoose';
import { USERS_COLLECTION } from '../../constants/database.constant';

const userSchema = new Schema({
  pseudo: String,
  id: Number,
  hash: String
})

const UserModel = mongoose.model('UserModel', userSchema, USERS_COLLECTION);

export default UserModel;
