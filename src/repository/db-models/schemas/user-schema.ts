import { Schema } from 'mongoose';

export const userSchema = new Schema({
  pseudo: String,
  id: Number,
  hash: String
});
