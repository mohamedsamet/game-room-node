import { RoomDto } from '../../../dto/room/room.dto';
import { roomCrudRepository } from '../../../repository/room-crud-repository';
import { userRepository } from '../../../repository/user.repository';
import { IRoom, IRoomResult } from '../../../repository/db-models/room-repo-model';
import { roomAccessRepository } from '../../../repository/room-access.repository';

async function addRoom(room: RoomDto, hash: string): Promise<IRoom> {
  const loggedUser = await userRepository.getUserByHash(hash);
  room.createdBy = loggedUser.pseudo;
  room.createdByUserHash = loggedUser.hash;
  room.createdAt = new Date().toLocaleString();
  return roomCrudRepository.addRoom(room);
}

async function getRoomsByPage(start: number, end: number): Promise<IRoomResult> {
  const roomsList = await roomCrudRepository.getRoomsPaginated(start, end);
  const total = await roomCrudRepository.getTotalRooms();
  return {total, rooms: roomsList}
}

async function deleteRoomById(id: string, userHash: string): Promise<IRoom> {
  return roomCrudRepository.deleteRoomById(id, userHash);
}

async function addUserToRoom(id: string, userHash: string): Promise<IRoom> {
  const user = await userRepository.getUserByHash(userHash);
  return roomAccessRepository.addUserToRoom(id, user._id);
}

async function removeUserFromRoom(id: string, userHash: string): Promise<IRoom> {
  const user = await userRepository.getUserByHash(userHash);
  return roomAccessRepository.removeUserFromRoom(id, user._id);
}

async function removeUserFromAllRooms(userHash: string): Promise<void> {
  const user = await userRepository.getUserByHash(userHash);
  return await roomAccessRepository.removeUserFromAllRooms(user._id);
}

async function getRoomsIds(userHash: string): Promise<string[]> {
  const user = await userRepository.getUserByHash(userHash);
  return await roomCrudRepository.getRoomsIds(user._id);
}

const roomService = {
  addRoom,
  getRoomsByPage,
  deleteRoomById,
  addUserToRoom,
  removeUserFromRoom,
  removeUserFromAllRooms,
  getRoomsIds
};
export {roomService};
