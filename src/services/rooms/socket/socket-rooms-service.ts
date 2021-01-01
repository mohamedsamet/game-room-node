import SocketIO from 'socket.io';
import {GET_CHATMSG_IN_ROOM, GET_ROOMS, GET_USERS_IN_ROOM} from '../../../constants/socket-events';
import { roomCrudRepository } from '../../../repository/room-crud-repository';
import { IUser, IUsersRoomResult } from '../../../repository/db-models/user-repo-model';
import { userRepository } from '../../../repository/user.repository';
import { IChat } from '../../../repository/db-models/chat-repo-model';
import { chatRepository } from '../../../repository/chat-repository';

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

async function emitMessagesInRoom(event: SocketIO.Server, roomId: string) {
  const chatMessages: IChat[] = await chatRepository.getChatMessagesByRoomId(roomId);
  event.sockets.in(roomId).emit(GET_CHATMSG_IN_ROOM, {data: parseChatMessagesDates(chatMessages)});
}

function getUsersInRoomResponse(roomId: string, users: IUser[]): IUsersRoomResult {
  return {users, roomId}
}

function parseChatMessagesDates(chatMessages: IChat[]): IChat[] {
  const currentDate = new Date().toLocaleString().slice(0, 10);
  chatMessages.forEach(chat => {
    chat.dateTime = chat.dateTime.slice(0, 10) === currentDate ? chat.dateTime.slice(-8) : chat.dateTime;
  });
  return chatMessages;
}

const socketRoomsService = {emitRooms, emitUsersInRoom, emitMessagesInRoom};

export {socketRoomsService}
