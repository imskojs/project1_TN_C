#!/usr/bin/env node

var fs = require('fs');

var iosPlatformsDir = "platforms/ios/www/";
var androidPlatformsDir = "platforms/android/assets/www/";

var foldersToDelete = [
    "codes"
];

foldersToDelete.forEach(function(folder) {
    deleteFolderRecursive(iosPlatformsDir + folder);
    deleteFolderRecursive(androidPlatformsDir + folder);
});

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
