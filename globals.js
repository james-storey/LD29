
var stage, renderer, player;
var gameStates = { start: 0, game: 1, gameOver: 2 };
var characters = [];
var width = 1000, height = 640;
var time = 0;
var view = { x: width / 2, y: height / 2 };