import express from 'express';
import http from 'http';
import socket, { Socket } from 'socket.io';
import { roomService } from '../../services/room.service';

const app = express();
const socketServer = new http.Server(app)
const io = socket(socketServer);
io.on("connection", (event) => {
  console.log('connected user', event.id);
  event.on('reqRooms', () => {
    event.emit('getRooms', {data: roomService.getRoomsList()});
  })
})

export {socketServer}
