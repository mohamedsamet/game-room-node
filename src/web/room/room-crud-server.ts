import express from 'express';
import { ROOM_URL } from '../server-urls';
import { RoomDto } from '../../dto/room/room.dto';
import { roomService } from '../../services/rooms/http/room.service';
import { errorHandlingService } from '../../services/common-http/error-handling.service';
import { ADD_NEW_ROOM_LOG, DELETE_ROOM_BY_ID, GET_ROOMS_BY_PAGE_LOG } from '../../constants/logs.constant';
import { RoomsResultDto } from '../../dto/room/rooms-result.dto';
import bodyParser from 'body-parser';

const roomCrudServer = express();
const jsonParse = bodyParser.json();

/** Add new room */
roomCrudServer.post(ROOM_URL, jsonParse, (req, res) => {
  const request: RoomDto = req.body;
  let response: RoomDto;
  try {
    response = roomService.addRoom(request, req.headers.authorization);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  console.log(ADD_NEW_ROOM_LOG);
  res.send(response);
});

/** Get rooms list */
roomCrudServer.get(ROOM_URL, jsonParse, (req, res) => {
  let response: RoomsResultDto;
  try {
    response = roomService.getRoomsByPage(+req.query.start, +req.query.end);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  console.log(GET_ROOMS_BY_PAGE_LOG);
  res.send(response);
});

/** Delete room by id */
roomCrudServer.delete(ROOM_URL, jsonParse, (req, res) => {
  let response: RoomsResultDto;
  try {
    response = roomService.deleteRoomById(+req.query.id, req.query.user.toString());
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  console.log(DELETE_ROOM_BY_ID);
  res.send(response);
});

export {roomCrudServer}
