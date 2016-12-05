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

    public async getFriends(query: any): Promise<Buddy[]> {

        var friendsCollection = await this.getDatabaseConnection();

        query._id && (query._id = new mongodb.ObjectID(query._id));
        var friends = await friendsCollection.find(query || {}).toArray();

        return friends;
    } 

    public async updateFriend(query: any, friend: Object): Promise<mongodb.UpdateWriteOpResult> {

        var friendsCollection = await this.getDatabaseConnection();
        
        query._id && (query._id = new mongodb.ObjectID(query._id));
        var result = await friendsCollection.updateOne(query, friend);

        return result;
    } 

    public async createFriend(friend: Buddy): Promise<Buddy> {

        var friendsCollection = await this.getDatabaseConnection();
        var result = await friendsCollection.insertOne(friend);

        return friend;
    } 
}