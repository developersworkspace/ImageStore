// Imports
import fs = require('fs');
import path = require('path');

// Imports helpers
import * as imageHelper from './imageHelper';
import * as fileHelper from './fileHelper';
import * as apiHelper from './apiHelper';

export function processImageFile(sourceDirectory: string, p: string) {
    return new Promise((resolve, reject) => {

        let directory = path.dirname(p);
        let relativePath = path.relative(sourceDirectory, p);
        let filename = path.basename(p);

        fileHelper.getFileChecksum(p).then((hash: string) => {

            apiHelper.checkIfFileExist(p).then((exist) => {

                if (exist) {

                    console.log(`File ${filename} already exists`);

                } else {

                    fileHelper.getTagsFromDirectory(directory).then((tags: string[]) => {

                        imageHelper.getBase64Thumbnail(p).then((base64: string) => {

                            apiHelper.uploadThumbnail(hash, base64, tags, relativePath, filename).then((r: any) => {
                                resolve(true);
                            });
                        });
                    });
                }
            });
        });
    });
}