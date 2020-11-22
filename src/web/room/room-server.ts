import bodyParser from 'body-parser';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import express from 'express';
import { roomUrl } from '../server-urls';
import { RoomDto } from '../../dto/room/room.dto';
import { roomService } from '../../services/rooms/http/room.service';

const roomServer = express();
const jsonParse = bodyParser.json();

/** Add new room */
roomServer.post(roomUrl, jsonParse, (req, res) => {
  const request: RoomDto = req.body;
  let response: RoomDto;
  try {
    response = roomService.addRoom(request, req.headers.authorization);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  res.send(response);
});

/** Get rooms list */
roomServer.get(roomUrl, jsonParse, (req, res) => {
  const response: RoomDto[] = roomService.getRoomsFirstPage();
  res.send(response);
});

export {roomServer};
