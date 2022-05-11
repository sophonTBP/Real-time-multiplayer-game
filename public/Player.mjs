class Player {
  constructor({ x, y, height, width, score, id, speed = 0 }) {

    Object.assign(this, { x, y, height, width, score, id, speed })
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

    //console.log(speed)

  }



  collision(item) {

    if (this.x + this.width / 2 >= item.x &&
      this.x + this.width / 2 <= item.x + item.width &&
      this.y + this.height / 2 >= item.y &&
      this.y + this.height / 2 <= item.y + item.height || this.x == item.x && this.y == item.y) {
      this.score++;
      this.speed = 0;

      return true

    }


  }

  calculateRank(playerList) {
    //console.log(playerList)
    let sortedRank = []
    for (let player of playerList) {
      sortedRank.push([player.id, player.score]);
    }

    sortedRank.sort(function (a, b) {
      return b[1] - a[1];
    });
    //console.log(sortedRank)

    const getRanked = () => { return sortedRank.findIndex(row => row.indexOf(this.id) !== -1) + 1; }
    let rank = `Rank: ${getRanked()}/${playerList.length}`
    return rank

  }
}

export default Player;
