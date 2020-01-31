var canvas,Path;
var car11,car22,car33,car44;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
function preload(){
  car11=loadImage("images/car1.png")
  car22=loadImage("images/car2.png")
  car33=loadImage("images/car3.png")
  car44=loadImage("images/car4.png")
  Path=loadImage("images/track.jpg")
}

function setup(){
  //DiplayWidth and DisplayHeight are in-Build Functions and -20 is for the minus from the orginal canvas.say it was 200.it would how 180. 
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  //Game is the class and we are creating object of this class and the name of the object is game.
  game = new Game();
  game.getState();
  game.start();
}



function draw(){
  //changing the gamestate if the value of players has reached the limit.
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    // clears the welcome and title messsages before the playing gamestate
    clear();
    game.play();
  }
  // this is the changing of gamestate 1 to 2 and the game coming to a end.The End.
  if(gameState === 2){
    game.end();
  }
}