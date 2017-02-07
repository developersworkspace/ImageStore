// Imports 
import request = require('request');

export function checkIfFileExist(hash: string) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://localhost:3000/api/image/exist?hash=' + hash,
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }
        }, (err: Error, resp: any, body: any) => {
            let jsonObj = JSON.parse(body);
            resolve(jsonObj.exist);
        });
    });
}

export function uploadThumbnail(deviceId: string, hash: string, base64: string, tags: string[], relativePath: string, name: string) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://localhost:3000/api/image/upload',
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            json: {
                deviceId: deviceId,
                hash: hash,
                base64: base64,
                tags: tags,
                relativePath: relativePath,
                name: name
            }
        }, (err: Error, resp: any, body: any) => {
            resolve(true);
        });
    });
}