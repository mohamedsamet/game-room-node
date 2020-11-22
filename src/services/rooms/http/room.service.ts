import { RoomDto } from '../../../dto/room/room.dto';
import { userService } from '../../user/user.service';
import { ROOM_PER_PAGE } from '../../../constants/rooms.constant';

const rooms: RoomDto[] = [];

function addRoom(room: RoomDto, hash: string): RoomDto {
  if (checkIfRoomNameExist(room.name)) {
    throw new Error('409');
  } else {
    room.createdBy = userService.getUserLogged(hash).pseudo;
    rooms.unshift(room)
  }
  return room;
}

function getRoomsFirstPage(): RoomDto[] {
  return rooms.slice(0, ROOM_PER_PAGE);
}

function checkIfRoomNameExist(name: string): boolean {
  return rooms.some(room => room.name === name);
}

const roomService = {addRoom, getRoomsList: getRoomsFirstPage};
export {roomService};
