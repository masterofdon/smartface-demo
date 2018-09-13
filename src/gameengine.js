var aiplayer = require('./aiplayer');

var engine = {};

var player = {};
player.currentChoice = null;

var timeToGo = 3;
const winners = ['RS' , 'SP' , 'PR'];
const drawers = ['RR' , 'SS' , 'PP'];
const MOVES = ["R" , "S" , "P"];
var gameInterval = null;

var resultsAggregate = [];

/**
*  Starts the game. Counts until three and a new round takes place.
*  @param {function} counterCallBack Callback for current timeToGo track.
*  @param {function} resultCallBack Callback for result track.
*/
engine.startGame = function(counterCallback , resultCallback){
    gameInterval = setInterval(counter.bind(this , counterCallback , resultCallback),1000);
}

/**
* Counts until 3 and deals a round.
*/
function counter(counterCallback , resultCallback){
    if(timeToGo < 1){
        timeToGo = 3;
        var result = round();
        resultsAggregate.push(result);
        engine.stopGame();
        setTimeout(function(){
            engine.startGame(counterCallback , resultCallback);
        },2000);
        resultCallback(result);
        return;
    }
    counterCallback(timeToGo--);
}

/**
 * Game Rule Engine. Both players choices are taken and concatenated according to rules.
 * Decides the winner or draw.
 * 
 */
function round(){
    let playerChoice = player.currentChoice;
    let aichoice = aiplayer.getNextMove();
    let result = playerChoice + aichoice;
    if(winners.indexOf(result) != -1){
        return 1;
    } else if(drawers.indexOf(result) != -1) {
        return 0;
    }
    return -1;
}

engine.testRound = function(){
    var numOfWins = 0;
    var numOfDraws = 0;
    var numOfLose = 0;
    player.currentChoice = "R";
    for(var i = 0; i < 1000 ; i++){
        var result = round();
        result == -1 ? numOfLose++ : result == 0 ? numOfDraws++ : numOfWins++;
    }
    return [numOfWins , numOfDraws , numOfLose];
}

/**
 * Stops the game. Maybe you are bored of this stuff.
 * Clears the interval and the counter.
 */
engine.stopGame = function(){
    timeToGo = 3;
    clearInterval(gameInterval);
}

/**
 * Historical Results Getter.
 */
engine.getResultsAggregate = function(){
    return resultsAggregate;
}

/**
 * 
 * @param {Gets the players Choice} choice 
 */
engine.changePlayerChoice = function(choice){
    if(MOVES.indexOf(choice) != -1){
        player.currentChoice = choice;
        return player.currentChoice;
    }
    throw new Error("Not A Valid Move");
}

module.exports = engine;