import {userServer} from './web/user/user-server';

const port = 3000;
userServer.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
