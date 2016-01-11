var request = require('request');
var fs = require('fs');
var path = require('path');
var data = require('./data1');

data.forEach(function (e) {
    if (e.photos.length) {
        return download(e.photos);
    }

    return download(Object.keys(e.photos).map(function (photoId) {
        return e.photos[photoId];
    }))
});

function download (array) {
    array.forEach(function (pic, i) {
        request
            .get(pic.image_url.pop())
            .pipe(fs.createWriteStream(path.resolve(__dirname, '%FOLDER_NAME%', pic.id + '.jpg')));
    });
}
