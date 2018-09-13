
/**OBJECTS */
var engine = {};
var aiplayer = {};
var player = {};

aiplayer.getNextMove = function () {
    const index = Math.floor(Math.random() * 3);
    const nextMove = MOVES[index];
    return nextMove;
}

player.currentChoice = null;

/** FLAGS */
var gameStarted = false;
var playing = false;
/** CONSTS */
const WINNERS = ['RS', 'SP', 'PR'];
const DRAWERS = ['RR', 'SS', 'PP'];
const MOVES = ["R", "S", "P"];
const PNG_ROCK = "/public/assets/images/rock.png";
const PNG_SCISSORS = "/public/assets/images/scissors.png";
const PNG_PAPER = "/public/assets/images/paper.png";
const PNG_ROCK_ACTIVE = "/public/assets/images/rock-active.png";
const PNG_SCISSORS_ACTIVE = "/public/assets/images/scissors-active.png";
const PNG_PAPER_ACTIVE = "/public/assets/images/paper-active.png";
/** REFS */
var timeToGo = 3;
var gameInterval = null;
var resultTimeout = null;
/**
*  Starts the game. Counts until three and a new round takes place.
*  @param {function} counterCallBack Callback for current timeToGo track.
*  @param {function} resultCallBack Callback for result track.
*/
engine.startGame = function (counterCallback, resultCallback) {
    if (!gameStarted) {
        gameInterval = setInterval(counter.bind(this, counterCallback, resultCallback), 1000);
        gameStarted = true;
    }
};

/**
* Counts until 3 and deals a round.
*/
function counter(counterCallback, resultCallback) {
    if (timeToGo < 1) {
        timeToGo = 3;
        var result = round();
        engine.stopGame();
        resultTimeout = setTimeout(function () {
            engine.startGame(counterCallback, resultCallback);
        }, 3000);
        resultCallback(result);
        return;
    }
    counterCallback(timeToGo--);
};

/**
 * Game Rule Engine. Both players choices are taken and concatenated according to rules.
 * Decides the winner or draw.
 * 
 */
function round() {
    let playerChoice = player.currentChoice;
    aiplayer.choice = aiplayer.getNextMove();
    let result = playerChoice + aiplayer.choice;
    if (WINNERS.indexOf(result) != -1) {
        return 1;
    } else if (DRAWERS.indexOf(result) != -1) {
        return 0;
    }
    return -1;
};

engine.testRound = function () {
    var numOfWins = 0;
    var numOfDraws = 0;
    var numOfLose = 0;
    player.currentChoice = "R";
    for (var i = 0; i < 1000; i++) {
        var result = round();
        result == -1 ? numOfLose++ : result == 0 ? numOfDraws++ : numOfWins++;
    }
    return [numOfWins, numOfDraws, numOfLose];
};

/**
 * Stops the game. Maybe you are bored of this stuff.
 * Clears the interval and the counter.
 */
engine.stopGame = function () {
    timeToGo = 3;
    gameStarted = false;
    clearInterval(gameInterval);
};

engine.stopAll = function () {
    timeToGo = 3;
    gameStarted = false;
    clearInterval(gameInterval);
    clearTimeout(resultTimeout);
    playing = false;
    clearAllSelectors();
    hideCurrentSelections();
};

/**
 * 
 * @param {Gets the players Choice} choice 
 */
engine.changePlayerChoice = function (choice) {
    if (MOVES.indexOf(choice) != -1) {
        player.currentChoice = choice;
        return player.currentChoice;
    }
    throw new Error("Not A Valid Move");
};

(function initUIChanges() {
    var src = document.getElementsByClassName("user-choice-container-img");
    for (var i = 0; i < src.length; i++) {
        var e = src[i];
        e.addEventListener('mouseover', function (e) {
            var cs = e.currentTarget.getAttribute("src");
            if (cs.indexOf("rock") != -1) {
                e.currentTarget.setAttribute("src", PNG_ROCK_ACTIVE);
            } else if (cs.indexOf("scissors") != -1) {
                e.currentTarget.setAttribute("src", PNG_SCISSORS_ACTIVE);
            } else if (cs.indexOf("paper") != -1) {
                e.currentTarget.setAttribute("src", PNG_PAPER_ACTIVE);
            }
        });
        e.addEventListener('mouseleave', function (e) {
            if (player.currentChoice == null) {
                var cs = e.currentTarget.getAttribute("src");
                if (cs.indexOf("rock") != -1) {
                    e.currentTarget.setAttribute("src", PNG_ROCK);
                } else if (cs.indexOf("scissors") != -1) {
                    e.currentTarget.setAttribute("src", PNG_SCISSORS)
                } else if (cs.indexOf("paper") != -1) {
                    e.currentTarget.setAttribute("src", PNG_PAPER)
                }
            }
        });
    }
})();

(function initEngine() {
    // start the game when ready.
    var startButtonElem = document.getElementById('start-button');
    startButtonElem.addEventListener('click', function (e) {
        if (!playing) {
            playing = true;
            if (!gameStarted) {
                // Stop The Game
                startButtonElem.innerHTML = "STARTS WHEN SELECTED...";
                activateSelectorButtons();
            }
        }
        else {
            deActivateSelectorButtons();
            startButtonElem.innerHTML = "START GAME";
            engine.stopAll();
        }

    });
})();

function activateSelectorButtons() {
    var src = document.getElementsByClassName("user-choice-container-img");
    for (var i = 0; i < src.length; i++) {
        src[i].addEventListener('click', activateSelectorHandler);
    }
}

function clearAllSelectors() {
    var src = document.getElementsByClassName("user-choice-container-img");
    for (var i = 0; i < src.length; i++) {
        var attr = src[i].getAttribute("src");
        if (attr.indexOf('rock') != -1) {
            src[i].setAttribute('src', PNG_ROCK);
        } else if (attr.indexOf('scissors') != -1) {
            src[i].setAttribute('src', PNG_SCISSORS);
        } else if (attr.indexOf('paper') != -1) {
            src[i].setAttribute('src', PNG_PAPER);
        }
    }
}

function showCurrentSelections() {
    var sides = document.getElementsByClassName('sides-current-choice');
    for (var x = 0; x < sides.length; x++) {
        sides[x].classList.remove("not-choosen");
    }
}

function hideCurrentSelections() {
    var sides = document.getElementsByClassName('sides-current-choice');
    for (var x = 0; x < sides.length; x++) {
        sides[x].classList.add("not-choosen");
    }
}

function activateSelectorHandler(e) {
    var attr = e.currentTarget.getAttribute("data-content");
    if (attr == "rock") {
        engine.changePlayerChoice("R");
        clearAllSelectors();
        e.currentTarget.setAttribute('src', PNG_ROCK_ACTIVE);
        document.getElementById('player-current-choice').setAttribute('src', PNG_ROCK_ACTIVE);

    } else if (attr == "scissors") {
        engine.changePlayerChoice("S");
        clearAllSelectors();
        e.currentTarget.setAttribute('src', PNG_SCISSORS_ACTIVE);
        document.getElementById('player-current-choice').setAttribute('src', PNG_SCISSORS_ACTIVE);
    } else if (attr == "paper") {
        engine.changePlayerChoice("P");
        clearAllSelectors();
        e.currentTarget.setAttribute('src', PNG_PAPER_ACTIVE);
        document.getElementById('player-current-choice').setAttribute('src', PNG_PAPER_ACTIVE);
    } else {
        return;
    }
    if (!gameStarted) {
        engine.startGame(
            function (counter) {
                hideCurrentSelections();
                var startButtonElem = document.getElementById('start-button');
                startButtonElem.innerHTML = counter;
            }, function (result) {
                
                var aiChoice = document.getElementById('ai-current-choice');
                if (aiplayer.choice == "R") {
                    aiChoice.setAttribute('src', PNG_ROCK_ACTIVE);
                } else if (aiplayer.choice == "S") {
                    aiChoice.setAttribute('src', PNG_SCISSORS_ACTIVE);
                }
                else if (aiplayer.choice == "P") {
                    aiChoice.setAttribute('src', PNG_PAPER_ACTIVE);
                }

                showCurrentSelections();
                var startButtonElem = document.getElementById('start-button');
                if (result == -1) {
                    startButtonElem.innerHTML = "AI WINS";
                } else if (result == 0) {
                    startButtonElem.innerHTML = "IT'S A DRAW";
                } else if (result == 1) {
                    startButtonElem.innerHTML = "YOU WIN!!!";
                }
            });
    }

}

function deActivateSelectorButtons() {
    var src = document.getElementsByClassName("user-choice-container-img");
    for (var i = 0; i < src.length; i++) {
        src[i].removeEventListener('click', activateSelectorHandler);
    }
}