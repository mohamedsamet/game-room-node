import { RoomDto } from '../dto/room/room.dto';

const rooms: RoomDto[] = [];

function addRoom(room: RoomDto): RoomDto {
  if (checkIfRoomNameExist(room.name)) {
    throw new Error('409');
  } else {
    rooms.push(room)
  }
  return room;
}

function checkIfRoomNameExist(name: string): boolean {
  return rooms.some(room => room.name === name);
}

const roomService = {addRoom};
export {roomService};
