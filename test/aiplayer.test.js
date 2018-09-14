var aiplayer = require('../src/aiplayer');
var assert = require('assert');

describe("AI Player Test Suite", function () {

    it('GetNextMove returns valid Move', function () {

        const MOVES = ["R", "S", "P"];
        var resultArray = [];
        for (var i = 0; i < 1000; i++) {
            const result = aiplayer.getNextMove();
            var index = MOVES.indexOf(result);
            resultArray.push(index);
        }
        var resultIndex = resultArray.indexOf(-1);
        assert.equal(resultIndex, -1);
    });

});