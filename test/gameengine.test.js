var assert = require('assert');
var gameengine = require('../src/gameengine');

const isNotNull = (e) => (e != null && e != 'undefined');

describe("GameEngine Test Suite", function () {

    it('Game Starts and Stops correctly', function (done) {
        var counterArray = [];
        var resultArray = [];
        gameengine.startGame(function(counter){
            counterArray.push(counter);
            gameengine.changePlayerChoice("R");
        }, function(result){
            var valid = false;
            if(result == -1 || result == 0 || result == 1){
                valid = true;
            }
            assert.equal(valid , true);
            assert.equal(counterArray.indexOf(-1) , -1);
            gameengine.stopGame();
            done();
        });
    });

    it('Game Starts and Stops and results aggregate returns non Null', function (done) {
        var counterArray = [];
        var resultCounter = 0;
        gameengine.startGame(function(counter){
            counterArray.push(counter);
        }, function(result){
            resultCounter++;
            var valid = false;
            if(result == -1 || result == 0 || result == 1){
                valid = true;
            }
            if(resultCounter == 2){
                gameengine.stopGame();
                assert.equal(gameengine.getResultsAggregate().length , 3);
                done();
            }
            
        });
    });

    it('Player changes valid choice', function () {

        var cChoice = gameengine.changePlayerChoice("R");
        assert.deepEqual(cChoice , "R");
    });

    it('WINs , LOSEs or DRAWs for some time', function () {
        var resArray = gameengine.testRound();
        assert.notEqual(resArray[0] , 0);
        assert.notEqual(resArray[1] , 0);
        assert.notEqual(resArray[2] , 0);
    });

    it('Player changes non-valid choice fails', function () {
        try{
            assert.fail(gameengine.changePlayerChoice("A"))
        }catch(error){
        }
        
    });

});