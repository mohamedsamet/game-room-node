import mongoose from 'mongoose';
import { USERS_COLLECTION } from '../../constants/database.constant';
import { userSchema } from './schemas/user-schema';

const UserRepoModel = mongoose.model('UserRepoModel', userSchema, USERS_COLLECTION);

export default UserRepoModel;
