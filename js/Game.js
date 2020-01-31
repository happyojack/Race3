class Game {
  constructor(){

  }
// here this function is written to read the value of gamestate from database
  getState(){
  // here we are refering to the gamestate in the database
    var gameStateRef  = database.ref('gameState');
   // .on islike a listener that keeps listening to the changes in database.  
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
// changing of value of gamestate in database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
// async  is the instructions will not be executed synchronusly because they will wait for certain events to happen.
  async start(){
    // if condition will work if we have less or three players joined the game
    if(gameState === 0){
// Player is the class and we are creating object of this class and the name of the object is player.
      player = new Player();
      // .once will get playercount data  only once.await function tells computer to WAIT.
      var playerCountRef = await database.ref('playerCount').once("value");
     //if anychange is registered in playercountref then the if condition will be executed.
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      //Form is the class and we are creating object of this class and the name of the object is form.
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,300);
    car2 = createSprite(400,300);
    car3 = createSprite(600,300);
    car4 = createSprite(800,300);
    cars = [car1, car2, car3, car4];
    car1.addImage("car1",car11)
    car4.addImage("car4",car44)
    car3.addImage("car3",car33)
    car2.addImage("car2",car22)
  
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers !== undefined){
      //var display_position = 100;
      //starts below 0 and it should be very long
      image(Path,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 280;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("green")
          ellipse(x,y,100,100)
          //cars[index - 1].fillColor = "blue";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //in this if condition we are changing the gamestate and updating the player rank by 1.
if(player.distance>3700){
  gameState=2
  player.rank+=1;
  Player.updaterank(player.rank);
}
  


drawSprites();
  
}

end(){
  console.log("The END OF THE GAME");
  console.log(player.rank)
}
}