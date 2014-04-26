
var game, player;
var gameStates = { start: 0, game: 1, gameOver: 2 };
var lookState = { down: 0, up: 1, right: 2, left: 3};
var characters = [];
var time = 0;

var upKey, downKey, leftKey, rightKey, spaceKey;