import * as mongodb from "mongodb";
import { Repository } from "../db/repository";
import { Buddy } from "./friend";

export class FriendsRepository extends Repository<Buddy> {
    constructor(
        database: mongodb.Db
    ){
        super(database);
    }

    protected get collectionName(): string {
        return "friends";
    }

    protected createModel(data: any): Buddy {
        return new Buddy(this, data);
    }


}