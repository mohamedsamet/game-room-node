import { roomService } from '../http/room.service';
import SocketIO from 'socket.io';
import { GET_ROOMS, GET_USERS_IN_ROOM } from '../../../constants/socket-events';
import { UsersRoomResultDto } from '../../../dto/user/users-room-result.dto';

function emitRooms(event: SocketIO.Server) {
  event.emit(GET_ROOMS, {data: roomService.getRoomsFirstPage()});
}

function emitUsersInRoom(event: SocketIO.Server, roomId: number) {
  event.emit(GET_USERS_IN_ROOM, {data: getUsersInRoomResponse(roomId)});
}

function getUsersInRoomResponse(roomId: number): UsersRoomResultDto {
  return {
    users: roomService.getUsersInRoom(roomId),
    roomId
  }
}

const socketRoomsService = {emitRooms, emitUsersInRoom}

export {socketRoomsService}
