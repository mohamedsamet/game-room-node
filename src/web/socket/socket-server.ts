import express from 'express';
import http from 'http';
import socket from 'socket.io';
import { CONNECTION, REQUEST_ROOMS } from '../../constants/socket-events';
import { socketRoomsService } from '../../services/rooms/socket/socket-rooms-service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);

io.on(CONNECTION, (event) => {
  console.log('connected user', event.id);
  event.on(REQUEST_ROOMS, () => {
    socketRoomsService.emitRooms(io);
  });
});

export {socketServer}
