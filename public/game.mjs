import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import KeyBoard from "./KeyboardInputs.mjs"


const socket = io();

const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

let width = document.getElementById("game-window").clientWidth
let height = document.getElementById("game-window").clientHeight

let keyBoard = new KeyBoard();



function drawStaticObject(mob) {
  let img = new Image();
  // Create new img element

  img.addEventListener('load', function () {
    ctx.imageSmoothingEnabled = true;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 15;
    ctx.drawImage(img, mob.x, mob.y, mob.width, mob.height)

  }, false);
  img.src = `./assets/collectibles/c${mob.value.toString()}.png` // Set source path 
}



function drawMobs(ctx, gameState) {
  let colors = ["blue", "red", "yellow", "green"]
  let images = []
  let value = 0;

  Object.entries(gameState).forEach((player, idx) => {
    images[idx] = new Image();
    images[idx].value = idx % 3;
    player.color=colors[images[idx].value]
    images[idx].src = `./assets/avatars/a${images[idx].value.toString()}.png`
    images[idx].addEventListener('load', function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.imageSmoothingEnabled = true;

      Object.entries(gameState).forEach((player, idx) => {

        ctx.shadowColor = colors[images[idx].value];
        ctx.shadowBlur = 15;
        ctx.drawImage(images[idx], player[1].x, player[1].y, 80, 80)

      });
    }, false)

  })
  document.getElementById("score_display").innerHTML = avatar.score;
 
}








const avatarHandler = {
  set(obj, prop, value) {

    socket.emit('message', obj)
    return Reflect.set(...arguments);
  }
}




let obj = keyBoard.movement;
let players = {};
let playerTotalNum = 0;
let testObj = new Proxy(obj, avatarHandler);

let avatar = {};
keyBoard.listener();

let item = {};
item.value = 0// initialize value before tick to avoid loging errorto console
let rank;

socket.on("handShake", (player) => {
  avatar = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: player.id, speed: 0 })
  players = {}
  
})

let playerRank
let playerList = [];
socket.on('tick', (gameState) => {

  socket.volatile.emit("currPlayerState", avatar);
  item = gameState.mob;
  rank = gameState.rank;
  playerList = [];

  
  Object.entries(gameState.players).forEach(player => {

    players[player[0]] = player[1];
    playerList.push(player[1]);
   

  })


  playerTotalNum = playerList.length
  if (avatar.score == 0) {
    playerRank = `Rank: ${playerList.length}/${playerList.length}`;
  }
  if (avatar.score != 0) {
    playerRank = avatar.calculateRank(playerList);
  }
  document.getElementById("rank_display").innerHTML = playerRank;
})





socket.on("playerDisconected", (playerId) => {
  players = {};
  delete players[playerId];
})



socket.io.on("connection_err", () => {
  console.log("connection_err")
  players = {};
  avatar = {};
})





setTimeout(() => {
  console.log(avatar.id)
  
  function play() {

    requestAnimationFrame(play);
  
    keyBoard.keyboardInput(canvas, avatar, avatar)


    avatar.movePlayer(avatar.dir, avatar.speed)
   
    if (avatar.collision(item) == true) {

      let trigger = true;
      socket.emit('collisionTrigger', avatar.id)
      keyBoard.movement.dir = "none"
      keyBoard.movement.speed = 0;
      
    }

    drawMobs(ctx, players)
    drawStaticObject(item)
    
  }

  play()
 
}, 1000)







