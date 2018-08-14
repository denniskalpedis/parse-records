const express = require('express');
const app = express();
const fs = require('fs');
const parse = require('./parse');

const server = app.listen(8000, function () {
    console.log("listening on port 8000");
});

app.get('/records/gender', function (request, response) {
    parse.load(function(err, results){
        response.status(200).json(parse.sortByGender(results));
    });
});
app.get('/records/birthdate', function (request, response) {
    parse.load(function(err, results){
        response.status(200).json(parse.sortByBirthDate(results));
    });
});
app.get('/records/name', function (request, response) {
    parse.load(function(err, results){
        response.status(200).json(parse.sortByLastName(results));
    });
});
app.post('/records', function (request, response) {
    var newLine = Object.values(request.query);
    // in windows line ends are '\r\n'. change to '\n' on mac
    fs.appendFile(parse.filename, "\n" + newLine.join(" | "), function (err) {

        if (err) return console.log(err);
        console.log('Appended!');
    });
    response.status(200).json({
        message: "Success!"
    });
});

module.exports = server;