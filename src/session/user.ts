import * as mongodb from "mongodb";
import {UsersRepository} from "./users-repository";

export class User { 

    constructor(private repository: UsersRepository, data?: any){
        data && ([this._id, this.facebook, this.picture, this.displayName] = data); 
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

    public async save(): Promise<User>{
        if(this._id){
            return await this.repository.create(this);
        }
        else {
            return await this.repository.update(this);
        }
    }
}