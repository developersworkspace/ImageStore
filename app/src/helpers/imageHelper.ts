// Imports
import fs = require('fs');
import resizeImg = require('resize-img');

// Imports helpers
import * as arrayBufferHelper from './arrayBufferHelper';

export function getBase64Thumbnail(p: string) {
    return new Promise((resolve, reject) => {
        resizeImg(fs.readFileSync(p), { width: 300 }).then(buffer => {
            let arrayBuffer = arrayBufferHelper.toArrayBuffer(buffer);
            let base64 = arrayBufferHelper.arrayBufferToBase64(arrayBuffer);
            resolve(base64);
        });
    });
}
