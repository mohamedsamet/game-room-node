import RoomRepositoryModel, { IRoom } from './db-models/room-repo.model';

async function addUserToRoom(roomId: string, userId: string): Promise<IRoom> {
    return await RoomRepositoryModel.findOneAndUpdate({_id: roomId}, { $addToSet: {users: userId}})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function removeUserFromRoom(roomId: string, userId: string): Promise<IRoom> {
    return await RoomRepositoryModel.findOneAndUpdate({_id: roomId}, { $pull: {users: userId}})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function removeUserFromAllRooms(userId: string): Promise<void> {
    return await RoomRepositoryModel.updateMany({}, { $pull: {users: userId}})
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function removeUsersFromAllRooms(): Promise<void> {
    return await RoomRepositoryModel.updateMany({}, { users: []})
      .then(res => res)
      .catch((e) => {throw e.message});
}

const roomAccessRepository = {addUserToRoom, removeUserFromRoom, removeUserFromAllRooms, removeUsersFromAllRooms};
export {roomAccessRepository};
