import { userServer } from './web/user/user-server';
import { expressServer } from './web/express-bean/allow-origin';
import { roomServer } from './web/room/room-server';
import { authServer } from './web/express-bean/auth-server';
import { socketServer } from './web/socket/socket-server';
import mongoose from 'mongoose';
import { EXPRESS_API_PORT, SOCKET_API_PORT } from './constants/api-const';
import { EXPRESS_CONNECTED_LOG, MONGO_DB_CONNECTED_LOG } from './constants/logs.constant';
import { MONGO_BASE_URL, MONGO_CONNECTION_OPTIONS, MONGO_DB, MONGO_PORT } from './constants/database.constant';
import { chatServer } from './web/chat/chat.server';

expressServer.use(authServer);
expressServer.use(userServer);
expressServer.use(roomServer);
expressServer.use(chatServer);

mongoose.connect(`${MONGO_BASE_URL}${MONGO_PORT}${MONGO_DB}`, MONGO_CONNECTION_OPTIONS, () => {
  console.log(MONGO_DB_CONNECTED_LOG)

  expressServer.listen(EXPRESS_API_PORT, () => {
    return console.log(`${EXPRESS_CONNECTED_LOG}${EXPRESS_API_PORT}`);
  });

  socketServer.listen(SOCKET_API_PORT);
})

