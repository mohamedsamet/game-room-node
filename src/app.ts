import { userServer } from './web/user/user.server';
import { expressServer } from './web/express-bean/express-allow-origin.server';
import { roomServer } from './web/room/room.server';
import { authServer } from './web/express-bean/auth.server';
import { socketServer } from './web/socket/socket.server';
import mongoose from 'mongoose';
import { EXPRESS_API_PORT, SOCKET_API_PORT } from './constants/api.constant';
import {
  EXPRESS_CONNECTED_LOG,
  MONGO_DB_CONNECTED_LOG,
  REMOVE_USERS_INIT_CONNECTION_LOG
} from './constants/logs.constant';
import {
  MONGO_CONNECTION_OPTIONS,
  MONGO_FINAL_URL,
} from './constants/database.constant';
import { chatServer } from './web/chat/chat.server';
import { roomService } from './services/rooms/http/room.service';
import { versionServer } from './web/version/version.server';

expressServer.use(authServer);
expressServer.use(userServer);
expressServer.use(roomServer);
expressServer.use(chatServer);
expressServer.use(versionServer);

mongoose.connect(`${MONGO_FINAL_URL}`, MONGO_CONNECTION_OPTIONS, (error) => {
  if (!error) {
    console.log(MONGO_DB_CONNECTED_LOG);
    roomService.cleanRoomsFromUsers().then(() => {console.log(REMOVE_USERS_INIT_CONNECTION_LOG)}).catch(err => err);
    expressServer.listen(EXPRESS_API_PORT, () => {
      return console.log(`${EXPRESS_CONNECTED_LOG}${EXPRESS_API_PORT}`);
    });
    socketServer.listen(SOCKET_API_PORT);
  } else {
    console.error(error);
  }
});

