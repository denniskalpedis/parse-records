var fs = require('fs');
if ((process.argv.includes("--use-strict") && process.argv.length < 4) || process.argv.length < 3) {
    console.log("need to pass in text file to parse.");
    console.log("EX: node " + process.argv[1] + " FILENAME");
    process.exit(1);
} else if ((process.argv.includes("--use-strict") && process.argv.length > 4)
    || (!process.argv.includes("--use-strict") && process.argv.length > 3)) {
    console.log("can only pass in one text file!");
    process.exit(1);
}
var filename = "";
if(process.argv.length === 4 && process.argv[2] == "--use-strict"){
    filename = process.argv[3];
} else {
    filename = process.argv[2];
}
module.exports = {
    load: function(callback) {
        fs.readFile(filename, 'utf8', function (err, data) {
            data = data.split('\r\n');
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].split(" | ").join(" ").split(", ").join(" ").split(" ");
                data[i] = {
                    "LastName": data[i][0],
                    "FirstName": data[i][1],
                    "Gender": data[i][2],
                    "FavoriteColor": data[i][3],
                    "DateOfBirth": data[i][4]
                };
            }
            callback(err, data);
        });
    },
    sortByGender: function(data) {
        var sortedLastName = data.sort(function (a, b) {
            return a.LastName.toUpperCase() > b.LastName.toUpperCase();
        });
        return sortedLastName.sort(function (a, b) {
            return a.Gender.toUpperCase() > b.Gender.toUpperCase();
        });
    },
    sortByBirthDate: function(data) {
        return data.sort(function (a, b) {
            return new Date(a.DateOfBirth) > new Date(b.DateOfBirth);
        });
    },
    sortByLastName: function(data) {
        return data.sort(function (a, b) {
            return a.LastName.toUpperCase() < b.LastName.toUpperCase();
        });
    },
    filename: filename
};