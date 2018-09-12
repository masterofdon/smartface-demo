var assert = require('assert'),
    http = require('http');
var server = require("../src/server");

describe('Server Test Suite', function () {
    before(function () {
        server.listen(80);
    });

    after(function () {
        server.close();
    });
    it('Home Page should return 200OK', function (done) {
        
        http.get('http://localhost', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Play Page should return 200OK', function (done) {
        http.get('http://localhost/play', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('HowToPlay Page should return 200OK', function (done) {
        http.get('http://localhost/how-to-play', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Documentation Page should return 200OK', function (done) {
        http.get('http://localhost/documentation', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('Unknown document(not the page) should get 500 Error', function (done) {
        http.get('http://localhost/500', function (res) {
            assert.equal(500, res.statusCode);
            done();
        });
    });

    it('Unknown Page should return 404-NotFound', function (done) {
        http.get('http://localhost/unknown', function (res) {
            assert.equal(404, res.statusCode);
            done();
        });
    });
});