// Imports
import resizeImg = require('resize-img');

// Imports helpers
import * as arrayBufferHelper from './arrayBufferHelper';
import * as fileHelper from './ftpFileHelper';

export function getBase64Thumbnail(p: string) {
    return fileHelper.getFileContents(p).then((data: any) => {
        return resizeImg(data, { width: 300 }).then(buffer => {
            let arrayBuffer = arrayBufferHelper.toArrayBuffer(buffer);
            let base64 = arrayBufferHelper.arrayBufferToBase64(arrayBuffer);
            return base64
        });
    });
}
