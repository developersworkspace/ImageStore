import fs = require('fs');
import btoa = require('btoa');
import resizeImg = require('resize-img');
import path = require('path');

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function arrayBufferToBase64(ab) {

    var dView = new Uint8Array(ab);

    var arr = Array.prototype.slice.call(dView);

    var arr1 = arr.map(function (item) {
        return String.fromCharCode(item);
    });

    return btoa(arr1.join(''));
}

function resizeImageToBase64(path, callback) {
    resizeImg(fs.readFileSync(path), { width: 128, height: 128 }).then(buf => {
        let arrayBuffer = toArrayBuffer(buf)
        let base64String = arrayBufferToBase64(arrayBuffer);
        callback(base64String);
    });
}



resizeImageToBase64('./../sampleSource/nature/butterfly-734654_1920.jpg', (bse64String) => {
    console.log(bse64String);
});

