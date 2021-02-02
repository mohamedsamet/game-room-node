import { roomCrudRepository } from '../../../repository/room-crud.repository';
import { userRepository } from '../../../repository/user.repository';
import { IRoom, IRoomResult } from '../../../repository/db-models/room-repo.model';
import { roomAccessRepository } from '../../../repository/room-access.repository';

async function addRoom(room: IRoom, id: string): Promise<IRoom> {
  const loggedUser = await userRepository.getUserById(id);
  room.createdBy = loggedUser.pseudo;
  room.createdByUserId = loggedUser._id;
  room.createdAt = new Date().toLocaleString();
  return roomCrudRepository.addRoom(room);
}

async function getRoomsByPage(start: number, end: number): Promise<IRoomResult> {
  const roomsList = await roomCrudRepository.getRoomsPaginated(start, end);
  const total = await roomCrudRepository.getTotalRooms();
  return {total, rooms: roomsList}
}

async function deleteRoomById(id: string, userId: string): Promise<IRoom> {
  return roomCrudRepository.deleteRoomById(id, userId);
}

async function addUserToRoom(id: string, userId: string): Promise<IRoom> {
  return roomAccessRepository.addUserToRoom(id, userId);
}

async function removeUserFromRoom(id: string, userId: string): Promise<IRoom> {
  return roomAccessRepository.removeUserFromRoom(id, userId);
}

async function removeUserFromAllRooms(userId: string): Promise<void> {
  return await roomAccessRepository.removeUserFromAllRooms(userId);
}

async function cleanRoomsFromUsers(): Promise<void> {
  return await roomAccessRepository.removeUsersFromAllRooms();
}

async function getRoomsIds(userId: string): Promise<string[]> {
  return await roomCrudRepository.getRoomsIds(userId);
}

const roomService = {
  addRoom,
  getRoomsByPage,
  deleteRoomById,
  addUserToRoom,
  removeUserFromRoom,
  removeUserFromAllRooms,
  getRoomsIds,
  cleanRoomsFromUsers
};
export {roomService};
