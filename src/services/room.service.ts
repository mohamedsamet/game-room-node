import { RoomDto } from '../dto/room/room.dto';
import { userService } from './user.service';

const rooms: RoomDto[] = [];

function addRoom(room: RoomDto, hash: string): RoomDto {
  if (checkIfRoomNameExist(room.name)) {
    throw new Error('409');
  } else {
    room.createdBy = userService.getUserLogged(hash).pseudo;
    rooms.push(room)
  }
  return room;
}

function getRoomsList(): RoomDto[] {
  return rooms;
}

function checkIfRoomNameExist(name: string): boolean {
  return rooms.some(room => room.name === name);
}

const roomService = {addRoom, getRoomsList};
export {roomService};
