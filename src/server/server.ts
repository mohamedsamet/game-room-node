import express from 'express';
import * as _intercept from './interceptor';
const server = _intercept.addAccessControlOrigin(express());

server.get('/', (req, res) => {
  res.send({user: 'user'});
});

export {server}
