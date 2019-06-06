//these are the test from puppies. obviously need changes. in my vscode its showing that were missing node module super test and cherio and needs installing so thats a bit of a heads up


const server = require("../server");
const request = require("supertest");
const cheerio = require("cheerio");

test("Initial Test", function(done) {
    expect(1).toBe(1);
    done();
});

test("Home page is displaying", function(done) {
    request(server)
        .get("/puppies")
        .end((err, res) => {
            const actual = res.text;
            expect(actual).toMatch(/Puppy Land/);
            done();
        });
});

test("Single puppy page is displaying", function(done) {
    request(server)
        .get("/puppies/1")
        .end((err, res) => {
            const actual = res.text;
            expect(actual).toMatch(/Puppy Land/);
            done();
        });
});

test("Edit puppy is displaying", function(done) {
    request(server)
        .get("/puppies/edit/1")
        .end((err, res) => {
            const actual = res.text;
            expect(actual).toMatch(/Puppy Land/);
            done();
        });
});

test("Edit form is working", function(done) {
    request(server)
        .get("/puppies/edit/1")
        .end((err, res) => {
            const $ = cheerio.load(res.text);
            console.log($("input").get(0));
            const actual = $("input");
            expect(actual).toMatch(/Puppy Land/);
            done();
        });
});