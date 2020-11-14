import express from 'express';
import * as _intercept from './interceptor';
import bodyParser from 'body-parser';
import { userUrl } from '../server-urls';

const userServer = _intercept.addAccessControlOrigin(express());
const jsonParse = bodyParser.json();

/** Add new user with pseudo*/
userServer.post(userUrl, jsonParse,  (req, res) => {
  res.send(req.body);
});

export {userServer}
