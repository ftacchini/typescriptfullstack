import * as mongodb from "mongodb";
import { Buddy } from "./friend";

export class FriendsRepository {
    constructor(
        private database: mongodb.Db
    ){
    }

    private async getDatabaseConnection(): Promise<mongodb.Collection>{

        var promise = new Promise<mongodb.Collection>((resolve, reject) => {
            this.database.collection("friends", (error, friendsCollection) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(friendsCollection);
                }
                
            });
        });

        return promise;
    }

    public async getFriends(query: Object): Promise<Buddy[]> {

        var friendsCollection = await this.getDatabaseConnection();
        var friends = await friendsCollection.find(query || {}).toArray();

        return friends;
    } 
}