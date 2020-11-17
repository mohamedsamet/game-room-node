import { Express } from 'express';
import express from 'express';

function addAccessControlOrigin(app: Express): Express {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  return app;
}

const expressServer: Express = addAccessControlOrigin(express());

export {expressServer};
