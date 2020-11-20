import { userServer } from './web/user/user-server';
import { expressServer } from './web/express-bean/allow-origin';
import { roomServer } from './web/room/room-server';
import { authServer } from './web/express-bean/auth-server';
import { socketServer } from './web/socket/socket-server';

const port = 3000;
const socketPort = 3002;

expressServer.use(authServer);
expressServer.use(userServer);
expressServer.use(roomServer);

expressServer.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

socketServer.listen(socketPort);
