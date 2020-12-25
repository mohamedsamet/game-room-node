import { RoomDto } from '../dto/room/room.dto';
import RoomRepositoryModel, { IRoom } from './db-models/room-repo-model';

async function addRoom(room: RoomDto): Promise<IRoom> {
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

function getRoomRepModel(roomDto: RoomDto): IRoom {
  return new RoomRepositoryModel({
    name: roomDto.name,
    createdBy: roomDto.createdBy,
    createdByUserHash: roomDto.createdByUserHash
  });
}

const roomRepository = {addRoom, getRoomsPaginated, getTotalRooms};
export {roomRepository};
