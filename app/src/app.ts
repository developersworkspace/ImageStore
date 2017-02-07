// Imports
import fs = require('fs');
import path = require('path');

// Imports helpers
import * as fileHelper from './helpers/fileHelper';
import * as appHelper from './helpers/appHelper';

let sourceDirectory = process.argv[2];

let supportedExt = ['jpg', 'png', 'jpeg']
let items = [];
let directories = fileHelper.listDirectories(sourceDirectory);

for (let i = 0; i < directories.length; i++) {
    let files = fileHelper.listFiles(directories[i]);

    for (let j = 0; j < files.length; j++) {
        if (supportedExt.indexOf(files[j].split('.').pop()) > -1) {
            let r = appHelper.processImageFile(sourceDirectory, files[j]);
            items.push(r);
        }
    }
}

Promise.all(items).then((result) => {
    console.log(result);
});



