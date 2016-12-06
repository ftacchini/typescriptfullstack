import * as mongodb from "mongodb";
import {Repository} from "./repository";

export abstract class Model {

    constructor(protected repository: Repository<Model>){
    }

    public _id: mongodb.ObjectID;

    public abstract toJson(): any;

    public async save(): Promise<Model>{
        if(this._id){
            return await this.repository.updateOne(this);
        }
        else {
            return await this.repository.createOne(this);
        }
    }
}