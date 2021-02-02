import express from 'express';
import { roomCrudServer } from './servers/room-crud.server';
import { roomAccessServer } from './servers/room-access.server';

const roomServer = express();

roomServer.use(roomCrudServer);
roomServer.use(roomAccessServer);

export {roomServer};
