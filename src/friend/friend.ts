import { Person } from './person';

interface IFriend{
    isBestFriend: boolean;
    isBoyfriend?: boolean;
    call(): any;
}

const callMessage: string =  "caling friend ";
const hugMessage: string =  "hugging friend: ";

class Friend extends Person implements IFriend{

 constructor(dni: string){
     super(dni);
 }

 public isBestFriend: boolean;

 public call(){
     console.log(callMessage + this.fullName());
 }

 public getHugged = (hugger: IFriend, say: string): boolean => {
     console.log(hugMessage + say);

     if(hugger.isBoyfriend){
         let love = true;
     }
     //Cannot access varaible love from here

     if(hugger.isBestFriend){
         var love = false;
     }
     //love is accessible from here, var is not a block variable


     return hugger.isBoyfriend || hugger.isBestFriend;
 }

}

export { Friend as Buddy };
export { IPerson } from './person';