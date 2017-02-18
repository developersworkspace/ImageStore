// Imports
import * as mongodb from 'mongodb';

// Imports models
import { Thumbnail } from './../models/thumbnail';

export class ImageService {


    exist(hash: string) {
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + 'localhost' + ':27017/' + 'imagestore', (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('images');
                    collection.findOne({ hash: hash }, (err: Error, result: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result == null) {
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        }
                        db.close();
                    });
                }
            });
        });
    }

    upload(obj: Thumbnail) {
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + 'localhost' + ':27017/' + 'imagestore', (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('images');
                    collection.insertOne(obj, (err: Error, result: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (result == null) {
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        }
                        db.close();
                    });
                }
            });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + 'localhost' + ':27017/' + 'imagestore', (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('images');
                    collection.find().toArray((err: Error, result: Thumbnail[]) => {
                        resolve(result);
                        db.close();
                    });
                }
            });
        });
    }

    drop() {
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + 'localhost' + ':27017/' + 'imagestore', (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('images');
                   collection.drop();
                   resolve(true);
                }
            });
        });
    }
}