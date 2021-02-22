import SocketIO from 'socket.io';
import {
  GET_CHATMSG_IN_ROOM, GET_ROOMS, GET_USERS_IN_ROOM, GET_WRITERS_IN_ROOM
} from '../../../constants/socket-events.constant';
import { roomCrudRepository } from '../../../repository/room-crud.repository';
import { IUser, IUsersRoomResult, IUserWriter } from '../../../repository/db-models/user-repo.model';
import { userRepository } from '../../../repository/user.repository';
import { IChat } from '../../../repository/db-models/chat-repo.model';
import { chatRepository } from '../../../repository/chat.repository';
import { chatService } from '../../chat/chat.service';

let writersInRooms: IUserWriter[] = [];
async function emitRooms(event: SocketIO.Server, roomsByPage: number) {
  const roomList = await roomCrudRepository.getRoomsPaginated(0, roomsByPage - 1);
  const total: string = await roomCrudRepository.getTotalRooms();
  const roomListResult = {total, rooms: roomList};
  event.emit(GET_ROOMS, {data: roomListResult});
}

async function emitUsersInRoom(event: SocketIO.Server, roomId: string) {
  const usersIds: string[] = await roomCrudRepository.getUsersInRoomById(roomId);
  const users: IUser[] = await userRepository.getUsersByIds(usersIds);
  event.sockets.in(roomId).emit(GET_USERS_IN_ROOM, {data: getUsersInRoomResponse(roomId, users)});
}

async function emitMessagesInRoom(event: SocketIO.Server, roomId: string) {
  const chatMessages: IChat[] = await chatRepository.getChatMessagesByRoomId(roomId, 0, 1);
  const message = chatService.parseChatMessagesDates(chatMessages)[0];
  event.sockets.in(roomId).emit(GET_CHATMSG_IN_ROOM, {data: message});
}

async function emitWritersInRoom(event: SocketIO.Server, roomId: string) {
  const writersInRoom: IUserWriter[] = writersInRooms.filter(user => user.roomId === roomId);
  event.sockets.in(roomId).emit(GET_WRITERS_IN_ROOM, {data: writersInRoom});
}

function updateWriterStateInRoom(state) {
  if (state.status) {
    pushWriterInRoom(state.roomId, state.pseudo, state._id);
  } else {
    deleteWriterFromRoomById(state.roomId, state.pseudo);
  }
}

function pushWriterInRoom(roomId: string, pseudo: string, userId: string): void {
  const writer: IUserWriter = {} as IUserWriter;
  writer.roomId = roomId;
  writer.pseudo = pseudo;
  writer._id = userId;
  if (isUserNotWritingInRoom(userId, roomId)) {
    writersInRooms.push(writer);
  }
}

function isUserNotWritingInRoom(userId: string, roomId: string): boolean {
  return !writersInRooms.find(writer => writer._id === userId && writer.roomId === roomId);
}

function deleteWriterFromRoomById(roomId: string, pseudo: string): void {
    writersInRooms = writersInRooms.filter(writer => !(writer.roomId === roomId && writer.pseudo === pseudo));
}

function deleteWriterFromAllRooms(userId: string) {
  writersInRooms = writersInRooms.filter(writer => writer._id !== userId);
}

function getUsersInRoomResponse(roomId: string, users: IUser[]): IUsersRoomResult {
  return {users, roomId}
}

const socketRoomsService = {emitRooms, emitUsersInRoom, emitNewMessageInRoom: emitMessagesInRoom, emitWritersInRoom, updateWriterStateInRoom, deleteWriterFromAllRooms};

export {socketRoomsService}
