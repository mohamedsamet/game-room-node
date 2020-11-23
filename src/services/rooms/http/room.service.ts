import { RoomDto } from '../../../dto/room/room.dto';
import { userService } from '../../user/user.service';
import { ROOM_PER_PAGE } from '../../../constants/rooms.constant';
import { RoomsResultDto } from '../../../dto/room/rooms-result.dto';

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

function getRoomsFirstPage(): RoomsResultDto {
  return {rooms: rooms.slice(0, ROOM_PER_PAGE), total: rooms.length};
}

function getTotalRooms(): number {
  return rooms.length;
}
function checkIfRoomNameExist(name: string): boolean {
  return rooms.some(room => room.name === name);
}

const roomService = {addRoom, getTotalRooms, getRoomsFirstPage};
export {roomService};
