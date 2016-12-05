import * as mongodb from "mongodb";

export abstract class Repository {

    constructor(
        private database: mongodb.Db
    ){
    }

    protected abstract get collectionName(): string;

    protected async getDatabaseConnection(): Promise<mongodb.Collection>{

        var promise = new Promise<mongodb.Collection>((resolve, reject) => {
            this.database.collection(this.collectionName, (error, friendsCollection) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(friendsCollection);
                }
                
            });
        });

        return promise;
    }

}