import { roomService } from '../http/room.service';
import SocketIO from 'socket.io';
import { GET_ROOMS, GET_USERS_IN_ROOM } from '../../../constants/socket-events';
import { UsersRoomResultDto } from '../../../dto/user/users-room-result.dto';
import { roomRepository } from '../../../repository/room.repository';

async function emitRooms(event: SocketIO.Server, roomsByPage: number) {
  const roomList = await roomRepository.getRoomsPaginated(0, roomsByPage - 1);
  const total: string = await roomRepository.getTotalRooms();
  const roomListResult = {total, rooms: roomList}
  event.emit(GET_ROOMS, {data: roomListResult});
}

function emitUsersInRoom(event: SocketIO.Server, room: string) {
  event.sockets.in(room).emit(GET_USERS_IN_ROOM, {data: getUsersInRoomResponse(+room)});
}

function getUsersInRoomResponse(roomId: number): UsersRoomResultDto {
  return {
    users: roomService.getUsersInRoom(roomId),
    roomId
  }
}

const socketRoomsService = {emitRooms, emitUsersInRoom}

export {socketRoomsService}
