import express from 'express';
import { ROOM_ACCESS_URL } from '../../../constants/api-const';
import { roomService } from '../../../services/rooms/http/room.service';
import { errorHandlingService } from '../../../services/common-http/error-handling.service';
import { ADD_USER_TO_ROOM_LOG, REMOVE_USER_FROM_ROOM_LOG } from '../../../constants/logs.constant';
import bodyParser from 'body-parser';

const roomAccessServer = express();
const jsonParse = bodyParser.json();

/** Add user to room */
roomAccessServer.post(ROOM_ACCESS_URL+ '/:roomId', jsonParse, (req, res) => {
  const roomId = +req.params.roomId;
  try {
    roomService.addUserToRoom(roomId, req.headers.authorization);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  console.log(ADD_USER_TO_ROOM_LOG);
  res.send();
});

/** Remove user from room */
roomAccessServer.delete(ROOM_ACCESS_URL+ '/:roomId', jsonParse, (req, res) => {
  const roomId = +req.params.roomId;
  try {
    roomService.removeUserFromRoom(roomId, req.headers.authorization);
  } catch (err) {
    return errorHandlingService.getResponse(res, err);
  }
  console.log(REMOVE_USER_FROM_ROOM_LOG);
  res.send();
});

export {roomAccessServer}
