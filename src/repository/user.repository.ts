import UserRepoModel, { IUser } from './db-models/user-repo-model';

async function addUser(pseudo: string): Promise<IUser> {
    const user: IUser = getUserRepModel(pseudo);
    return await user.save()
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getUserById(id: string): Promise<IUser> {
    return await UserRepoModel.findOne({_id: id})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function removeUserById(id: string): Promise<IUser> {
    return await UserRepoModel.findOneAndRemove({_id: id})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getUsersByIds(ids: string[]): Promise<IUser[]> {
    return await UserRepoModel.find({_id: { $in: ids}})
      .then(res => res)
      .catch((e) => {throw e.message});
}

function getUserRepModel(pseudo: string): IUser {
  return new UserRepoModel({pseudo});
}

const userRepository = {addUser, getUserById, removeUserById, getUsersByIds};
export {userRepository};
