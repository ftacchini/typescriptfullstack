import * as mongodb from "mongodb";
import { Repository } from "../db/repository";
import { User } from "./user";

export class UsersRepository extends Repository<User> {
    constructor(
        database: mongodb.Db
    ){
        super(database);
    }

    protected get collectionName(): string {
        return "users";
    }

    protected createModel(data: any): User {
        return new User(this, data);
    }

}