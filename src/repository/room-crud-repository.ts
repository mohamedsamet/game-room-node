import RoomRepositoryModel, { IRoom } from './db-models/room-repo-model';

async function addRoom(room: IRoom): Promise<IRoom> {
    const roomToSave: IRoom = getRoomRepModel(room);
    return await roomToSave.save()
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getRoomsPaginated(start: number, end: number): Promise<IRoom[]> {
    return await RoomRepositoryModel.find({})
      .sort({field: 'asc', _id: -1})
      .skip(start)
      .limit(end - start + 1)
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getTotalRooms(): Promise<string> {
    return await RoomRepositoryModel.countDocuments()
    .then(res => res)
    .catch((e) => {throw e.message});
}

async function deleteRoomById(roomId: string, id: string): Promise<IRoom> {
  return await RoomRepositoryModel.findOneAndDelete({_id: roomId, createdByUserId: id})
    .then(res => res)
    .catch((e) => {throw e.message})
}

async function getUsersInRoomById(roomId: string): Promise<string[]> {
  return await RoomRepositoryModel.findOne({_id: roomId})
    .then(res => res.users)
    .catch((e) => {throw e.message})
}

async function getRoomsIds(userId: string): Promise<string[]> {
  return await RoomRepositoryModel.find({ users: { $in: [userId]}})
    .then(res => {return res.map(room => room._id)})
    .catch((e) => {throw e.message})
}

function getRoomRepModel(roomDto: IRoom): IRoom {
  return new RoomRepositoryModel({
    name: roomDto.name,
    createdBy: roomDto.createdBy,
    createdByUserId: roomDto.createdByUserId,
    createdAt: roomDto.createdAt
  });
}

const roomCrudRepository = {addRoom, getRoomsPaginated, getTotalRooms, deleteRoomById, getUsersInRoomById, getRoomsIds};
export {roomCrudRepository};
