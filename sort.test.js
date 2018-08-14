const request = require('supertest');
process.argv.push("text1.txt");
const parsing = require('./parse');

describe('test parsing file', () => {
    it("load should return Array of objects with 5 keys", (done) => {
        function callback(err, data) {
            if(err) throw done(err);
            expect(Array.isArray(data))
            .toBe(true);
            expect(Object.keys(data[0]).length)
            .toBe(5);
            done();
        }
        parsing.load(callback);
    });
    it("Should return an array of objects sorted by gender", (done) => {
        expect(parsing.sortByGender([{LastName:"johns", Gender:"male"}, {LastName:"johns", Gender:"female"}]))
        .toEqual([{LastName:"johns", Gender:"female"}, {LastName:"johns", Gender:"male"}]);
        done();
    });
    it("Should return an array of objects sorted by birthdate", (done) => {
        expect(parsing.sortByBirthDate([{DateOfBirth:"5/4/1992"}, {DateOfBirth:"7/17/1983"}]))
        .toEqual([{DateOfBirth:"7/17/1983"}, {DateOfBirth:"5/4/1992"}]);
        done();
    });
    it("Should return an array of objects sorted by last name", (done) => {
        expect(parsing.sortByLastName([{"LastName":"Kalpedis"}, {"LastName":"Peters"}]))
        .toEqual([{"LastName":"Peters"}, {"LastName":"Kalpedis"}]);
        done();
    });
    
});

describe('test server routes', () => {
    var server;
    beforeEach(function () {
        server = require('./server');
      });
    afterEach(function () {
        server.close();
    });
    it('It should respond to /records/birthdate with status 200 and be JSON', (done) => {
        request(server)
            .get("/records/birthdate")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err) => {
                if(err) throw done(err);
                done();
        });
    });
    it('It should respond to /records/gender with status 200 and be JSON', (done) => {
        request(server)
            .get("/records/gender")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err) => {
                if(err) throw done(err);
                done();
        });
    });
    it('It should respond to /records/name with status 200 and be JSON', (done) => {
        request(server)
            .get("/records/name")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err) => {
                if (err) throw done(err);
                done();
            });
    });
});