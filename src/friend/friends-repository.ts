import * as mongodb from "mongodb";
import { Repository } from "../db/repository";
import { Buddy } from "./friend";

export class FriendsRepository extends Repository {
    constructor(
        database: mongodb.Db
    ){
        super(database);
    }

    protected get collectionName(): string {
        return "friends";
    }

    public async find(query: any): Promise<Buddy[]> {

        var friendsCollection = await this.getDatabaseConnection();

        query._id && (query._id = new mongodb.ObjectID(query._id));
        var friends = await friendsCollection.find(query || {}).toArray();

        return friends;
    } 

    public async updateOne(query: any, friend: Object): Promise<mongodb.UpdateWriteOpResult> {

        var friendsCollection = await this.getDatabaseConnection();
        
        query._id && (query._id = new mongodb.ObjectID(query._id));
        var result = await friendsCollection.updateOne(query, friend);

        return result;
    } 

    public async create(friend: Buddy): Promise<Buddy> {

        var friendsCollection = await this.getDatabaseConnection();
        var result = await friendsCollection.insertOne(friend);

        return friend;
    } 
}