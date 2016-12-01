import * as express from "express";
import * as mongodb from "mongodb";

import { initializeDatabase } from "./db";

import { FriendsRepository } from "./friends-repository";
import { FriendsController } from "./friends-controller";

var app = express();


initializeDatabase((error: mongodb.MongoError, database: mongodb.Db) => {

  if(error){
    console.error(error);
    return;
  }

  console.log("Database initialized");

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
    initializeControllers(database, app);
  });

});

function initializeControllers(database: mongodb.Db, app: express.Express){
  var repository = new FriendsRepository(database)
  var controller = new FriendsController(app, repository);
  controller.initialize();
}