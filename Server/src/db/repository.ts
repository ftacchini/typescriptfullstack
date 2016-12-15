import * as mongodb from "mongodb";
import { Model } from "./model";

export abstract class Repository<T extends Model> {

    constructor(
        private database: mongodb.Db
    ){
    }

    protected abstract get collectionName(): string;

    protected abstract createModel(data: any): T;

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

    public async find(query: any): Promise<T[]> {

        var collection = await this.getDatabaseConnection();

        query._id && (query._id = new mongodb.ObjectID(query._id));
        var dataObjects = await collection.find(query || {}).toArray();

        return dataObjects.map((dataObject) => { return this.createModel(dataObject); });
    } 

    public async findOne(query: any): Promise<T> {

        var collection = await this.getDatabaseConnection();

        query._id && (query._id = new mongodb.ObjectID(query._id));
        var result = await collection.findOne(query || {});

        return result && this.createModel(result);
    } 

    public async findById(id: string): Promise<T> {

        var collection = await this.getDatabaseConnection();
        var result = await collection.findOne({_id: new mongodb.ObjectID(id)});

        return result && this.createModel(result);
    } 

    public async createOne(model: T): Promise<T> {

        var collection = await this.getDatabaseConnection();
        var result = await collection.insertOne(model.toJson());

        return model;
    } 

    public async updateOne(model: T): Promise<T> {

        var colection = await this.getDatabaseConnection();
        var result = await colection.updateOne({_id: model._id }, model.toJson());

        return model;
    } 

}