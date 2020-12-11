import { roomService } from '../http/room.service';
import SocketIO from 'socket.io';
import { GET_ROOMS, GET_USERS_IN_ROOM } from '../../../constants/socket-events';

function emitRooms(event: SocketIO.Server) {
  event.emit(GET_ROOMS, {data: roomService.getRoomsFirstPage()});
}

function emitUsersInRoom(event: SocketIO.Server, roomId) {
  event.emit(GET_USERS_IN_ROOM, {data: roomService.getUsersInRoom(roomId)});
}

const socketRoomsService = {emitRooms, emitUsersInRoom}

export {socketRoomsService}
