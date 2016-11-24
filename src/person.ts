export interface IPerson {
    readonly dni: string;
    age: number;
    name: string;
    lastName: string;
    fullName(): string;
}

export class Person implements IPerson {

    private lastNameValue: string;

    constructor(public readonly dni: string){
    }

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
}