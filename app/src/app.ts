// Imports
import fs = require('fs');
import path = require('path');
import uuid = require('uuid');

// Imports helpers
import * as fileHelper from './helpers/ftpFileHelper';
import * as appHelper from './helpers/appHelper';


function start() {
    //let sourceDirectory = process.argv[2];
    let sourceDirectory = '/home/barend/sampleSource'

    let supportedExt = ['jpg', 'png', 'jpeg']

    fileHelper.listDirectories(sourceDirectory).then((directories: string[]) => {
        for (let i = 0; i < directories.length; i++) {

            fileHelper.listFiles(directories[i]).then((files: any[]) => {
                for (let j = 0; j < files.length; j++) {
                    if (supportedExt.indexOf(files[j].split('.').pop()) > -1) {
                        appHelper.processImageFile(deviceId, sourceDirectory, files[j])
                            .then((result) => {
                                console.log(result);
                            }).catch((err: Error) => {
                                console.log(err);
                            });;
                    }
                }
            }).catch((err: Error) => {
                console.log(err);
            });
        }
    }).catch((err: Error) => {
        console.log(err);
    });;
}

let deviceId = null;

if (fs.existsSync('./app.data')) {
    deviceId = fs.readFileSync('./app.data').toString();
    start();

} else {
    deviceId = uuid.v4();
    fs.writeFile('app.data', deviceId, (err: Error) => {
        start();
    });
}


