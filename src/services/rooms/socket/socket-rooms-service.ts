import SocketIO from 'socket.io';
import { GET_ROOMS, GET_USERS_IN_ROOM } from '../../../constants/socket-events';
import { IUsersRoomResult } from '../../../dto/user/users-room-result.dto';
import { roomCrudRepository } from '../../../repository/room-crud-repository';
import { IUser } from '../../../repository/db-models/user-repo-model';
import { userRepository } from '../../../repository/user.repository';

async function emitRooms(event: SocketIO.Server, roomsByPage: number) {
  const roomList = await roomCrudRepository.getRoomsPaginated(0, roomsByPage - 1);
  const total: string = await roomCrudRepository.getTotalRooms();
  const roomListResult = {total, rooms: roomList}
  event.emit(GET_ROOMS, {data: roomListResult});
}

async function emitUsersInRoom(event: SocketIO.Server, roomId: string) {
  const usersIds: string[] = await roomCrudRepository.getUsersInRoomById(roomId);
  const users: IUser[] = await userRepository.getUsersByIds(usersIds);
  event.sockets.in(roomId).emit(GET_USERS_IN_ROOM, {data: getUsersInRoomResponse(roomId, users)});
}

function getUsersInRoomResponse(roomId: string, users: IUser[]): IUsersRoomResult {
  return {users, roomId}
}

const socketRoomsService = {emitRooms, emitUsersInRoom}

export {socketRoomsService}
