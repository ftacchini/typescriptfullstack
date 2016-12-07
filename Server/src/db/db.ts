import * as mongodb from "mongodb";

export function initializeDatabase(callback: mongodb.MongoCallback<mongodb.Db>) {

    mongodb.MongoClient.connect("mongodb://username:password@ds113668.mlab.com:13668/typescriptfullstack", callback);

}