const router = require('express').Router();
const Upload = require('upload');
const output_files = require('../output_files')

var http = require('http'),
    fs = require('fs');

var request = http.get(/output_files, function(response) {
    if (response.statusCode === 200) {
        result.download(path, file.originalname);
        response.pipe(file);
    }
    // Add timeout.
    request.setTimeout(12000, function () {
        request.abort();
    });
});


// const fs = require('fs');
// const http = require('http');
//
// const download = (url, dest, cb) => {
//     const file = fs.createWriteStream(dest);
//
//     const request = http.get(url, (response) => {
//         // check if response is success
//         if (response.statusCode !== 200) {
//             return cb('Response status was ' + response.statusCode);
//         }
//
//         response.pipe(file);
//     });
//
//     // close() is async, call cb after close completes
//     file.on('finish', () => file.close(cb));
//
//     // check for request error too
//     request.on('error', (err) => {
//         fs.unlink(dest);
//         return cb(err.message);
//     });
//
//     file.on('error', (err) => { // Handle errors
//         fs.unlink(dest); // Delete the file async. (But we don't check the result)
//         return cb(err.message);
//     });
// };