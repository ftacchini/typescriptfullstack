import * as mongodb from "mongodb";
import {Model} from "../db/model";
import {UsersRepository} from "./users-repository";

export class User extends Model { 

    constructor(repository: UsersRepository, data?: any){
        super(repository);
        if(data){
            this._id = data._id;
            this.facebook = data.facebook;
            this.picture = data.picture;
            this.displayName = data.displayName;
        }
    }

    public _id: mongodb.ObjectID;
    public facebook: string;
    public picture: string;
    public displayName: string;

    public toJson(): any {
        return {
            _id: this._id,
            facebook: this.facebook,
            picture: this.picture,
            displayName: this.displayName
        };
    }
}