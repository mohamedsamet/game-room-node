import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { CONNECTION, REQUEST_ROOMS } from '../../constants/socket-events';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms-service';
import { GET_ROOMS_SOCKET_LOG } from '../../constants/logs.constant';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (event) => {
  console.log('connected user', event.id);
  event.on(REQUEST_ROOMS, () => {
    console.log(GET_ROOMS_SOCKET_LOG)
    socketRoomsService.emitRooms(io);
  });
});

export {socketServer}
