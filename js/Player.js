class Player {
  constructor(){
    // this.index is the index for the player's array.
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=null;
  }
// it is checking the reference to the database for playercount
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    //"/" location 
    database.ref('/').update({
      playerCount: count
    });
  }
// WE ARE UPDATING THE PLAYER'S NAME & DISTANCE COVERED BY THE player
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }
// we are listing to the change in value of players 
 static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  // updating the rank In Database
  static updaterank(rank){
    database.ref('/').update({
Rank:rank
    })
  }
  // getting the Rank from Database
getRank(){
  // giving reference to database about the Rank
  database.ref('Rank').on("value",(data)=>{
    this.rank=data.val()
  
  })
}
}