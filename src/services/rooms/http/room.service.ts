import { RoomDto } from '../../../dto/room/room.dto';
import { CONFLICT_CODE, NOT_FOUND_CODE } from '../../../constants/errors-code.constant';
import { UserDto } from '../../../dto/user/user.dto';
import { roomRepository } from '../../../repository/room.repository';
import { userRepository } from '../../../repository/user.repository';
import { IRoom } from '../../../repository/db-models/room-repo-model';
import { IRoomResult } from '../../../repository/db-models/room-repo-result';

const rooms: RoomDto[] = [];

async function addRoom(room: RoomDto, hash: string): Promise<IRoom> {
  const loggedUser = await userRepository.getUserByHash(hash);
  room.createdBy = loggedUser.pseudo;
  room.createdByUserHash = loggedUser.hash;
  room.createdAt = new Date().toLocaleDateString();
  return roomRepository.addRoom(room);
}

async function getRoomsByPage(start: number, end: number): Promise<IRoomResult> {
  const roomsList = await roomRepository.getRoomsPaginated(start, end);
  const total = await roomRepository.getTotalRooms();
  return {
    total, rooms: roomsList
  }
}

async function deleteRoomById(id: string, userHash: string): Promise<IRoom> {
  return roomRepository.deleteRoomById(id, userHash);
}

function isRoomExist(roomId: number): boolean {
  return rooms.some(room => room.id === roomId);
}

function addUserToRoom(roomId: number, userHash: string): void {
  if (isRoomExist(roomId)) {
    if (!isUserExistInRoom(roomId, userHash)) {
    //  const user: UserDto = userService.getUserLogged(userHash);
    //  rooms.find(roomEntred => roomEntred.id === roomId).users.push(user);
    } else {
      throw new Error(CONFLICT_CODE);
    }
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function removeUserFromRoom(roomId: number, userHash: string): void {
  if (isRoomExist(roomId)) {
      const roomtoEdit: RoomDto = rooms.find(roomEntred => roomEntred.id === roomId);
    let usersOfroomToEdit: UserDto[] = roomtoEdit.users;
    usersOfroomToEdit = usersOfroomToEdit.filter(userInRoom => userInRoom.hash !== userHash);
    roomtoEdit.users = usersOfroomToEdit;
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function removeUserFromAllRooms(userHash: string): void {
  rooms.forEach(room => {
    let userToEdit = room.users;
    userToEdit = userToEdit.filter(user => user.hash !== userHash);
    room.users = userToEdit;
  })
}

function isUserExistInRoom(roomId: number, userHash: string) {
  return rooms.find(room => room.id === roomId).users.some(user => user.hash === userHash);
}

function getUsersInRoom(roomId: number): UserDto[] {
  return rooms.find(room => room.id === roomId).users;
}

function getRoomsIds(): number[] {
  return rooms.map(room => room.id);
}

const roomService = {
  addRoom,
  getRoomsByPage,
  deleteRoomById,
  addUserToRoom,
  removeUserFromRoom,
  removeUserFromAllRooms,
  getUsersInRoom,
  getRoomsIds
};
export {roomService};
