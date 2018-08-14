const parse = require('./parse');
parse.load(function(err, results){
    sorts(results);
});
function sorts(data){
    console.log("-------Sorted By Gender-----------");
    console.log(parse.sortByGender(data));
    console.log("-------Sorted By Birthdate-----------");
    console.log(parse.sortByBirthDate(data));
    console.log("-------Sorted By Last Name Desc.-----------");
    console.log(parse.sortByLastName(data));
}