// Imports
import fs = require('fs');
import path = require('path');
import crypto = require('crypto')

export function listDirectories(p: string) {
    return fs.readdirSync(p)
        .filter(file => fs.statSync(path.join(p, file)).isDirectory())
        .map((file) => path.join(p, file));
}

export function listFiles(p: string) {
    return fs.readdirSync(p)
        .filter(file => fs.statSync(path.join(p, file)).isFile())
        .map((file) => path.join(p, file));
}


export function getTagsFromDirectory(directory) {
    return new Promise((resolve, reject) => {
        fs.readFile(directory + '/tags.txt', 'utf8', function (err: Error, data: any) {
            if (err) {
                reject(err);
            } else {
                let tags = data.split(',');
                resolve(tags);
            }
        });
    });
}


export function getFileChecksum(p: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(p, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let hash = checksum(data, null, null);
                resolve(hash);
            }
        });
    });
}

export function getFileContents(p: string) {
    return fs.readFileSync(p);
}

function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}
