import * as mongodb from "mongodb";
import { Repository } from "../db/repository";
import { User } from "./user";

export class UsersRepository extends Repository {
    constructor(
        database: mongodb.Db
    ){
        super(database);
    }

    protected get collectionName(): string {
        return "users";
    }

    public async findOne(query: any): Promise<User> {

        var friendsCollection = await this.getDatabaseConnection();

        query._id && (query._id = new mongodb.ObjectID(query._id));
        var result = await friendsCollection.findOne(query || {});

        return new User(this, result);
    } 

    public async findById(id: string): Promise<User> {

        var friendsCollection = await this.getDatabaseConnection();
        var result = await friendsCollection.findOne({_id: new mongodb.ObjectID(id)});

        return new User(this, result);
    } 

    public async create(user: User): Promise<User> {

        var friendsCollection = await this.getDatabaseConnection();
        var result = await friendsCollection.insertOne(user.toJson());

        return user;
    } 

    public async update(user: User): Promise<User> {

        var friendsCollection = await this.getDatabaseConnection();
        var result = await friendsCollection.updateOne({_id: user._id }, user.toJson());

        return user;
    } 
}