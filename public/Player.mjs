class Player {
  constructor({x, y,height,width, score, id, speed }) {
   
    Object.assign(this, {x, y,height,width, score, id, speed })  
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

    if (this.x+this.width/2 >= item.x &&
      this.x+this.width/2 <= item.x + item.width &&
      this.y+this.height/2  >= item.y &&
      this.y+this.height/2  <= item.y + item.height||this.x==item.x&&this.y==item.y) {
      this.score++
     
      return true

      }
     

  }

  calculateRank(arr) {


  }
}

export default Player;
