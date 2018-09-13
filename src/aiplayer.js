
const MOVES = ["R" , "S" , "P"];

exports.getNextMove = function(){
    const index = Math.floor(Math.random() * 3);
    const nextMove = MOVES[index];
    return nextMove;
}
