import express from 'express';
import { roomCrudServer } from './room-crud-server';
import { roomAccessServer } from './room-access.server';

const roomServer = express();

roomServer.use(roomCrudServer);
roomServer.use(roomAccessServer);

export {roomServer};
