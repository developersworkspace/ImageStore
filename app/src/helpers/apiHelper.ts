// Imports 
import request = require('request');

export function checkIfFileExist(hash: string) {
    return new Promise((resolve, reject) => {
        resolve(false);
    });
}

export function uploadThumbnail(hash: string, base64: string, tags: string[], relativePath: string, name: string) {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}