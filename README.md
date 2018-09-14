## Basic Overview

A Simple RSP game for Smartface interview.

<br>

### Install

```
npm install
```

### Run

```
npm start
```

### Test
```
npm test
```

## About Rock-Scissors-Paper
You can learn about Rock-Scissors-Paper game from link below:
<a href="https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors">Wikipedia</a>
<br>

## Rules
The players usually count aloud to three, or speak the name of the game (e.g. "Rock! Paper! Scissors!" or "Ro Sham Bo!"), each time either raising one hand in a fist and swinging it down on the count or holding it behind. They then "throw" by extending it towards their opponent. Variations include a version where players use only three counts before throwing their gesture (thus throwing on the count of "Scissors!" or "Bo!"), or a version where they shake their hands three times before "throwing".

## How To Play
To start the game, simply click on the Start game button in the middle. After that, you will also need to select your very first shape.
Once the shape is selected the game starts automatically. Every 3 seconds a new shape is compared. Following the rules and conventions,
winner is selected and another game starts after 2 seconds of pause.

# Demo

![](GitSmartFace.gif)

#### Test Results

  AI Player Test Suite
    √ GetNextMove returns valid Move

  GameEngine Test Suite
    √ Game Starts and Stops correctly (4007ms)
    √ Game Starts and Stops and results aggregate returns non Null (6005ms)
    √ Player changes valid choice
    √ WINs , LOSEs or DRAWs for some time
    √ Player changes non-valid choice fails

  Server Test Suite
    √ Home Page should return 200OK (529ms)
    √ Play Page should return 200OK
    √ HowToPlay Page should return 200OK
    √ Documentation Page should return 200OK
    √ Unknown document(not the page) should get 500 Error
    √ Unknown Page should return 404-NotFound


  12 passing (11s)

### BACKEND STRUCTURE & STRATEGIES

At this point, backend consists of only a server module which deals with basic http routing and error controlling(CONTROLLER).
Although we have started the server side game logic, at this current phase we have decided to leave the logic on client sides.
In the future, with the help of websockets we are planning to move the logic back to server side.

However, even though game rules and gameengine resides on client side, we wanted to have a full functionality and unit tests.
We have decided to use the server side code to test. Front-end tests at this point seems to be off-target.

server.js , as mentioned above, deals with routing. There are 4 pages availabe for users to route in which play
is the target for web application's user to play the game against computer designated as AI PLAYER.

For resources as css files and images, a generic routing has been added. Anything that does not fall in these routes go to 404 - Not Found.
Also, there might be some cases in the future where content of the webpage has been removed whereas the reference page has not. This may
cause a problem on server side which will be denoted with Http Status of 500 - Internal Server Error.

### FRONTEND STRUCTURE & STRATEGIES

At the frontend , a simple welcome/home page has been designed with HTML and some CSS. No user interaction at this point is being expected.
In the future, some personal info might be needed in order the system to utilize the info to create users and authenticate them.

play.js, which is the main JavaScript file that runs for the play page, contains several internal and external(regarding from nodejs perspective)
libraries. Since there are plans to move the programme logic to server side, additional test will be required.

At this point of the project, no need has been seen to use websockets as told above.

### DB STRUCTURE & STRATEGIES

Current phase of the project does not require a DB.


