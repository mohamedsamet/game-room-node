import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { CONNECTION, DISCONNECT, LEAVE_USER_FROM_ROOM, REQUEST_ROOMS, REQUEST_USERS_IN_ROOM } from '../../constants/socket-events';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms-service';
import {
  CONNECTED, DISCONNECTED, GET_ROOMS_SOCKET_LOG, GET_USERS_SOCKET_IN_ROOM_LOG, LEAVE_USER_IN_ROOM_LOG
} from '../../constants/logs.constant';
import { roomService } from '../../services/rooms/http/room.service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (socketEvent) => {
  let userConnectedHash: string;
  console.log(CONNECTED, socketEvent.id);
  socketEvent.on(REQUEST_ROOMS, userHash => {
    console.log(GET_ROOMS_SOCKET_LOG);
    userConnectedHash = userHash;
    socketRoomsService.emitRooms(io);
  });

  socketEvent.on(REQUEST_USERS_IN_ROOM, roomId => {
    console.log(GET_USERS_SOCKET_IN_ROOM_LOG);
    socketEvent.join(roomId);
    socketRoomsService.emitUsersInRoom(io, roomId);
  });

  socketEvent.on(LEAVE_USER_FROM_ROOM, roomId => {
    console.log(LEAVE_USER_IN_ROOM_LOG);
    socketEvent.leave(roomId);
    socketRoomsService.emitUsersInRoom(io, roomId);
  });

  socketEvent.on(DISCONNECT, () => {
    console.log(DISCONNECTED, userConnectedHash);
    roomService.removeUserFromAllRooms(userConnectedHash);
    socketRoomsService.emitRooms(io);
    emitToAllConnectedRooms();
  })
});

function emitToAllConnectedRooms() {
  roomService.getRoomsIds().forEach(roomId => {
    socketRoomsService.emitUsersInRoom(io, roomId.toString());
  })
}

export {socketServer}
