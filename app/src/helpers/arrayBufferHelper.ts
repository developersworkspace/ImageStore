// Imports
import btoa = require('btoa');

export function toArrayBuffer(buffer: any) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

export function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {

    var dView = new Uint8Array(arrayBuffer);

    var arr = Array.prototype.slice.call(dView);

    var arr1 = arr.map(function (item) {
        return String.fromCharCode(item);
    });

    return btoa(arr1.join(''));
}