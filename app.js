var express = require("express");
var multer = require('multer');
var app = express();
var filename;
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '/tmp');
    },
    filename: function(req, file, callback) {
        filename = file.fieldname + '-' + Date.now() + '.js';
        callback(null, filename);
    }
});
var upload = multer({
    storage: storage
}).single('file');

app.post('/', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.error(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
        // const pong = require('./uploads/' + filename);
        // pong();
        return true;
    });
});

app.listen(process.env.port || process.env.PORT || 8080, function() {
    console.log("Working on port %s", process.env.port || process.env.PORT || 8080);
});
