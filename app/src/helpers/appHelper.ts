// Imports
import fs = require('fs');
import path = require('path');

// Imports helpers
import * as imageHelper from './imageHelper';
import * as fileHelper from './ftpFileHelper';
import * as apiHelper from './apiHelper';

export function processImageFile(deviceId: string, sourceDirectory: string, p: string) {
    return new Promise((resolve, reject) => {

        let directory = path.dirname(p);
        let relativePath = path.relative(sourceDirectory, p);
        let filename = path.basename(p);

        fileHelper.getFileChecksum(p).then((hash: string) => {

            apiHelper.checkIfFileExist(hash).then((exist) => {

                if (exist) {
                    
                    resolve(false);

                } else {

                    fileHelper.getTagsFromDirectory(directory).then((tags: string[]) => {

                        imageHelper.getBase64Thumbnail(p).then((base64: string) => {
                            apiHelper.uploadThumbnail(deviceId, hash, base64, tags, relativePath, filename).then((r: any) => {
                                resolve(true);
                            }).catch((err: Error) => {
                                reject(err);
                            });;
                        });
                    }).catch((err: Error) => {
                        reject(err);
                    });
                }
            }).catch((err: Error) => {
                reject(err);
            });;
        }).catch((err: Error) => {
            reject(err);
        });;
    });
}