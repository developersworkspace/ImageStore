// Imports
import resizeImg = require('resize-img');

// Imports helpers
import * as arrayBufferHelper from './arrayBufferHelper';
import * as fileHelper from './fileHelper';

export function getBase64Thumbnail(p: string) {
    return new Promise((resolve, reject) => {
        resizeImg(fileHelper.getFileContents(p), { width: 300 }).then(buffer => {
            let arrayBuffer = arrayBufferHelper.toArrayBuffer(buffer);
            let base64 = arrayBufferHelper.arrayBufferToBase64(arrayBuffer);
            resolve(base64);
        });
    });
}
