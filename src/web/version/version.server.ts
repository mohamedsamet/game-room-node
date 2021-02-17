import bodyParser from 'body-parser';
import { VERSION_URL} from '../../constants/api.constant';
import * as packageVersion from '../../../package.json';
import express from 'express';

const versionServer = express();
const jsonParse = bodyParser.json();

/** Add new user with pseudo */
versionServer.get(VERSION_URL, jsonParse, (req, res) => {
  const version = packageVersion.version;
  res.send(version);
});

export {versionServer}
