import {Model} from "../db/model";
import {FriendsRepository} from "./friends-repository";

export interface IPerson {
    readonly dni: string;
    age: number;
    id: string;
    name: string;
    lastName: string;
    fullName(): string;
}

export class Person extends Model implements IPerson {

    private lastNameValue: string;

    constructor(repository: FriendsRepository, data?: any){
        super(repository);
        if(data){ 
            this._id = data._id;
            this.age = data.age;
            this.dni = data.dni;
            this.lastName = data.lastName;
            this.name = data.name;
        }
    }
    
    
    public readonly dni: string
    public id: string;
    public age: number;
    name: string;

    get lastName(): string{
        return this.lastNameValue;
    }
    
    set lastName(value: string){
        this.lastNameValue = value;
    }

    fullName(): string{
        return this.lastName + ", " + this.name;
    }
    
    public toJson(): any {
        return {
            _id: this._id,
            dni: this.dni,
            age: this.age,
            lastName: this.lastName,
            name: this.name
        };
    }
}