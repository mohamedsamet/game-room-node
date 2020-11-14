import {server} from './server/server';

const port = 3000;
server.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
