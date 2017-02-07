import fs = require('fs');
import btoa = require('btoa');
import resizeImg = require('resize-img');
import path = require('path');

function toArrayBuffer(buffer: any) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {

    var dView = new Uint8Array(arrayBuffer);

    var arr = Array.prototype.slice.call(dView);

    var arr1 = arr.map(function (item) {
        return String.fromCharCode(item);
    });

    return btoa(arr1.join(''));
}

function resizeImageToBase64(p: string) {
    return new Promise((resolve, reject) => {
        resizeImg(fs.readFileSync(p), { width: 128, height: 128 }).then(buffer => {
            let arrayBuffer = toArrayBuffer(buffer)
            let base64 = arrayBufferToBase64(arrayBuffer);
            resolve(base64);
        });
    });
}

function listDirectories(p: string) {
    return fs.readdirSync(p)
        .filter(file => fs.statSync(path.join(p, file)).isDirectory())
        .map((file) => path.join(p, file));
}

function listFiles(p: string) {
    return fs.readdirSync(p)
        .filter(file => fs.statSync(path.join(p, file)).isFile())
        .map((file) => path.join(p, file));
}

function processFile(p: string) {
    return new Promise((resolve, reject) => {
        let directory = path.dirname(p);
        fs.readFile(directory + '/tags.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            let tags = data.split(',');

            resizeImageToBase64(p).then((base64) => {
                resolve(true);
            });
        });
    });
}

let sourceDirectory = process.argv[2];

let supportedExt = ['jpg', 'png', 'jpeg']
let items = [];
let directories = listDirectories(sourceDirectory);

for (let i = 0; i < directories.length; i++) {
    let files = listFiles(directories[i]);

    for (let j = 0; j < files.length; j++) {
        if (supportedExt.indexOf(files[j].split('.').pop()) > -1) {
            let r = processFile(files[j]);
            items.push(r);
        }
    }
}

Promise.all(items).then((result) => {
    console.log(result);
});



