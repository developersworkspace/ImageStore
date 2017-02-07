import ftp = require('ftp');
import path = require('path');
import crypto = require('crypto');

// let host = '192.168.1.68';
// let username = 'erasmus';
// let password = 'password';

let host = '192.168.1.68';
let username = 'barend';
let password = 'MidericK96';

export function listDirectories(p: string) {
    return new Promise((resolve, reject) => {

        p = p.split('\\').join('/');

        let ftpClient = new ftp();
        ftpClient.on('ready', function () {
            ftpClient.list(p, (err: Error, list: any[]) => {
                if (err) throw err;

                list = list.filter((file) => file.type == 'd')
                    .map((file) => path.join(p, file.name));

                resolve(list);

                ftpClient.end();
            });
        });


        ftpClient.connect({
            host: host,
            user: username,
            password: password
        });
    });
}

export function listFiles(p: string) {
    return new Promise((resolve, reject) => {

        p = p.split('\\').join('/');

        let ftpClient = new ftp();
        ftpClient.on('ready', function () {
            ftpClient.list(p, (err: Error, list: any[]) => {
                if (err) throw err;

                list = list.filter((file) => file.type != 'd')
                    .map((file) => path.join(p, file.name));

                resolve(list);

                ftpClient.end();
            });
        });


        ftpClient.connect({
            host: host,
            user: username,
            password: password
        });
    });
}

export function getTagsFromDirectory(directory: string) {
    return new Promise((resolve, reject) => {
        resolve([]);
    });
}


export function getFileChecksum(p: string) {
    return new Promise((resolve, reject) => {

        p = p.split('\\').join('/');

        getFileContents(p).then((data: any) => {
            let hash = checksum(data.toString(), null, null);
            resolve(hash);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export function getFileContents(p: string) {
    return new Promise((resolve, reject) => {

        p = p.split('\\').join('/');

        var ftpClient = new ftp();
        ftpClient.on('ready', function () {
            ftpClient.get(p, (err: Error, stream: any) => {
                if (err) reject(err);

                var buffer = new Buffer([]);

                stream.on('data', function (chunk) {

                    buffer = Buffer.concat([buffer, chunk]);
                });

                stream.on('readable', function () {
                    resolve(buffer);
                });

                ftpClient.end();
            });
        });

        ftpClient.connect({
            host: host,
            user: username,
            password: password
        });
    });
}

function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

