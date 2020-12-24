import { RoomDto } from '../../../dto/room/room.dto';
import { userService } from '../../user/user.service';
import { ROOM_PER_PAGE } from '../../../constants/rooms.constant';
import { RoomsResultDto } from '../../../dto/room/rooms-result.dto';
import { CONFLICT_CODE, INAUTHORIZED_CODE, NOT_FOUND_CODE } from '../../../constants/errors-code.constant';
import { UserDto } from '../../../dto/user/user.dto';

let rooms: RoomDto[] = [];

function addRoom(room: RoomDto, hash: string): RoomDto {
  if (checkIfRoomNameExist(room.name)) {
    throw new Error(CONFLICT_CODE);
  } else {
  //  const loggedUser = userService.getUserLogged(hash);
    room.id = rooms.length + 1;
   // room.createdBy = loggedUser.pseudo;
   // room.createdByUserHash = loggedUser.hash;
    room.users = [];
    rooms.unshift(room)
  }
  return room;
}

function getRoomsFirstPage(): RoomsResultDto {
  return {rooms: rooms.slice(0, ROOM_PER_PAGE), total: rooms.length};
}

function getRoomsByPage(start: number, end: number): RoomsResultDto {
  return {rooms: rooms.slice(start, end + 1), total: rooms.length};
}

function checkIfRoomNameExist(name: string): boolean {
  return rooms.some(room => room.name === name);
}

function deleteRoomById(id: number, userHash: string): RoomsResultDto {
  if (isRoomExist(id)) {
    if (isRoomOwnedByUser(id, userHash)) {
      rooms = rooms.filter(room => room.id !== id);
      return {} as RoomsResultDto;
    } else {
      throw new Error(INAUTHORIZED_CODE);
    }
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function isRoomOwnedByUser(roomId: number, userHash: string): boolean {
  return rooms.find(room => room.id === roomId).createdByUserHash === userHash;
}

function isRoomExist(roomId: number): boolean {
  return rooms.some(room => room.id === roomId);
}

function addUserToRoom(roomId: number, userHash: string): void {
  if (isRoomExist(roomId)) {
    if (userService.checkIfUserExist(userHash)) {
      if (!isUserExistInRoom(roomId, userHash)) {
      //  const user: UserDto = userService.getUserLogged(userHash);
      //  rooms.find(roomEntred => roomEntred.id === roomId).users.push(user);
      } else {
        throw new Error(CONFLICT_CODE);
      }
    } else {
      throw new Error(INAUTHORIZED_CODE);
    }
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function removeUserFromRoom(roomId: number, userHash: string): void {
  if (isRoomExist(roomId)) {
    if (userService.checkIfUserExist(userHash)) {
      const roomtoEdit: RoomDto = rooms.find(roomEntred => roomEntred.id === roomId);
      let usersOfroomToEdit: UserDto[] = roomtoEdit.users;
      usersOfroomToEdit = usersOfroomToEdit.filter(userInRoom => userInRoom.hash !== userHash);
      roomtoEdit.users = usersOfroomToEdit;
    } else {
      throw new Error(INAUTHORIZED_CODE);
    }
  } else {
    throw new Error(NOT_FOUND_CODE);
  }
}

function removeUserFromAllRooms(userHash: string): void {
    if (userService.checkIfUserExist(userHash)) {
      rooms.forEach(room => {
        let userToEdit = room.users;
        userToEdit = userToEdit.filter(user => user.hash !== userHash);
        room.users = userToEdit;
      })
    } else {
      throw new Error(INAUTHORIZED_CODE);
    }
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
  getRoomsFirstPage,
  deleteRoomById,
  addUserToRoom,
  removeUserFromRoom,
  removeUserFromAllRooms,
  getUsersInRoom,
  getRoomsIds
};
export {roomService};
