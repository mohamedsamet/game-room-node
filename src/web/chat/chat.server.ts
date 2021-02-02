import express from 'express';
import bodyParser from 'body-parser';
import { CHAT_URL } from '../../constants/api.constant';
import { chatService } from '../../services/chat/chat.service';
import { errorHandlingService } from '../../services/common-http/error-handling.service';

const chatServer = express();
const jsonParse = bodyParser.json();

/** Add user to room */
chatServer.post(CHAT_URL+ '/:roomId', jsonParse, (req, res) => {
  chatService.addChatMsg(req.params.roomId, req.headers.authorization, req.body.message).then(chat => {
      res.send(chat);
  }).catch(err => {return errorHandlingService.getDbErrorResponse(res, err);})
});

export {chatServer}
