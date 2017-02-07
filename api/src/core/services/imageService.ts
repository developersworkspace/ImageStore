// Imports
import * as mongodb from 'mongodb';

export class ImageService {


    exist(hash) {
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + 'localhost' + ':27017/' + 'imagestore', (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('clients');
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

}