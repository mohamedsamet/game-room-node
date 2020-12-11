import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { CONNECTION, DISCONNECT, REQUEST_ROOMS } from '../../constants/socket-events';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms-service';
import { GET_ROOMS_SOCKET_LOG } from '../../constants/logs.constant';
import { roomService } from '../../services/rooms/http/room.service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (socketEvent) => {
  let userConnectedHash: string;
  console.log('connected user', socketEvent.id);
  socketEvent.on(REQUEST_ROOMS, userHash => {
    console.log(GET_ROOMS_SOCKET_LOG);
    userConnectedHash = userHash;
    socketRoomsService.emitRooms(io);
  });

  socketEvent.on(DISCONNECT, () => {
    console.log('disconnected user', userConnectedHash);
    roomService.removeUserFromAllRooms(userConnectedHash);
    socketRoomsService.emitRooms(io);
  })
});


export {socketServer}
