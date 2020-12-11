import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { CONNECTION, DISCONNECT, REQUEST_ROOMS, REQUEST_USERS_IN_ROOM } from '../../constants/socket-events';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms-service';
import { GET_ROOMS_SOCKET_LOG, GET_USERS_SOCKET_IN_ROOM_LOG } from '../../constants/logs.constant';
import { roomService } from '../../services/rooms/http/room.service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (socketEvent) => {
  let userConnectedHash: string;
  const roomsConnected: number[] = [];
  console.log('connected user', socketEvent.id);
  socketEvent.on(REQUEST_ROOMS, userHash => {
    console.log(GET_ROOMS_SOCKET_LOG);
    userConnectedHash = userHash;
    socketRoomsService.emitRooms(io);
  });

  socketEvent.on(REQUEST_USERS_IN_ROOM, roomId => {
    console.log(GET_USERS_SOCKET_IN_ROOM_LOG);
    socketRoomsService.emitUsersInRoom(io, roomId);
    roomsConnected.push(roomId);
  });


  socketEvent.on(DISCONNECT, () => {
    console.log('disconnected user', userConnectedHash);
    roomService.removeUserFromAllRooms(userConnectedHash);
    socketRoomsService.emitRooms(io);
    emitToAllConnectedRooms(roomsConnected);
  })
});

function emitToAllConnectedRooms(roomsIds: number[]) {
  roomsIds.forEach(roomId => {
    socketRoomsService.emitUsersInRoom(io, roomId);
  })
}


export {socketServer}
