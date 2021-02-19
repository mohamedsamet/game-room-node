import express from 'express';
import http from 'http';
import socket from 'socket.io';
import {
  CONNECTION, DISCONNECT, LEAVE_USER_FROM_ROOM, PUSH_WRITER_STATE_IN_ROOM, REQUEST_CHATMSG_IN_ROOM, REQUEST_ROOMS, REQUEST_USERS_IN_ROOM,
  REQUEST_WRITERS_IN_ROOM
} from '../../constants/socket-events.constant';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms.service';
import {
  CONNECTED, DISCONNECTED, GET_ROOMS_MESSAGES_LOG, GET_ROOMS_SOCKET_LOG, GET_ROOMS_WRITER_LOG, GET_USERS_SOCKET_IN_ROOM_LOG,
  LEAVE_USER_IN_ROOM_LOG, PUSH_WRITER_STATE_IN_ROOM_LOG
} from '../../constants/logs.constant';
import { roomService } from '../../services/rooms/http/room.service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (socketEvent) => {
  let userId: string;
  let roomsByPage: number;
  console.log(CONNECTED, socketEvent.id);
  socketEvent.on(REQUEST_ROOMS, body => {
    console.log(GET_ROOMS_SOCKET_LOG);
    userId = body.id;
    roomsByPage = body.roomsByPage;
    socketRoomsService.emitRooms(io, roomsByPage).then(res => res).catch(err => err);
  });

  socketEvent.on(REQUEST_USERS_IN_ROOM, roomId => {
    console.log(GET_USERS_SOCKET_IN_ROOM_LOG);
    socketEvent.join(roomId);
    socketRoomsService.emitUsersInRoom(io, roomId).then(res => res).catch(err => err);
  });

  socketEvent.on(LEAVE_USER_FROM_ROOM, roomId => {
    console.log(LEAVE_USER_IN_ROOM_LOG);
    socketEvent.leave(roomId);
    socketRoomsService.emitUsersInRoom(io, roomId).then(res => res).catch(err => err);
  });

  socketEvent.on(REQUEST_CHATMSG_IN_ROOM, body => {
    console.log(GET_ROOMS_MESSAGES_LOG);
    socketEvent.join(body.roomId);
    socketRoomsService.emitMessagesInRoom(io, body).then(res => res).catch(err => err);
  });

  socketEvent.on(REQUEST_WRITERS_IN_ROOM, roomId => {
    console.log(GET_ROOMS_WRITER_LOG);
    socketEvent.join(roomId);
    socketRoomsService.emitWritersInRoom(io, roomId).then(res => res).catch(err => err);
  });

  socketEvent.on(PUSH_WRITER_STATE_IN_ROOM, state => {
    console.log(PUSH_WRITER_STATE_IN_ROOM_LOG);
    socketRoomsService.updateWriterStateInRoom(state);
  });

  socketEvent.on(DISCONNECT, async () => {
    console.log(DISCONNECTED, userId);
    const roomsWhereUserIsConnectedIds = await roomService.getRoomsIds(userId);
    socketRoomsService.deleteWriterFromAllRooms(userId);
    roomService.removeUserFromAllRooms(userId).then(() => {
      socketRoomsService.emitRooms(io, roomsByPage).then(res => res).catch(err => err);
      emitToAllConnectedRooms(roomsWhereUserIsConnectedIds).then(res => res).catch(err => err);
    }).catch(err => err);
  });
});

async function emitToAllConnectedRooms(roomsConnectedIds: string[]) {
  roomsConnectedIds.forEach(roomId => {
    socketRoomsService.emitUsersInRoom(io, roomId).then(res => res).catch(err => err);
    socketRoomsService.emitWritersInRoom(io, roomId).then(res => res).catch(err => err);
  });
}

export {socketServer}
