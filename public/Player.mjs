class Player {
  constructor( x, y, score, id, speed = 0 ) {
    this.x=x;
    this.y=y;
    this.score=score;
    this.id=id;
    this.speed=speed;
    //Object.assign(this, { x, y, score, id, speed})  
  }

  movePlayer(dir, speed) {
    
    //let this = { x: 0, y: 0 };
    


    if (dir == "rightup") {
      this.x += speed;
      this.y -= speed
    }

    if (dir == "rightdown") {
      this.x += speed;
      this.y += speed
    }

    if (dir == "leftup") {
      this.x -= speed;
      this.y -= speed
    }
    if (dir == "leftdown") {
      this.x -= speed;
      this.y += speed
    }

    if (dir == "right") {
      this.x += speed
    }
    if (dir == "left") {
      this.x -= speed
    }
    if (dir == "down") {
      this.y += speed
    }
    if (dir == "up") {
      this.y -= speed
    }



    

  }



  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
