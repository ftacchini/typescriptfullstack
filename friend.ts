import { Person } from './person';

interface IFriend{
    isBestFriend: boolean;
    isLover?: boolean;
    call();
}

class Friend extends Person implements IFriend{

 constructor(dni: string){
     super(dni);
 }

 public isBestFriend: boolean;

 public call(){
     console.log("caling friend " + this.fullName());
 }

}

export { Friend };
export { Friend as Buddy };
export { IPerson } from './person';