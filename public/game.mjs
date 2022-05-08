import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import KeyBoard from "./KeyboardInputs.mjs"


const socket = io();

const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

let width = document.getElementById("game-window").clientWidth
let height = document.getElementById("game-window").clientHeight

let keyBoard = new KeyBoard();



function generateMob() {

  let randomValue = Math.floor((Math.random() * 4))
  let randomX = Math.floor((Math.random() * 560))
  let randomY = Math.floor((Math.random() * 250) + 150)
  let id = Date.now()
  //{x, y, value, id}
  return new Collectible({ x: randomX, y: randomY, value: randomValue, id: id })



}

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

  let images = []
  let value = 0;

  Object.entries(gameState).forEach((player, idx) => {
    images[idx] = new Image();
    images[idx].value = idx % 3;
    images[idx].src = `./assets/avatars/a${value.toString()}.png`
    images[idx].addEventListener('load', function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = true;
      ctx.shadowColor = 'red';
      ctx.shadowBlur = 15;
      Object.entries(gameState).forEach((player, idx) => {
        ctx.drawImage(images[idx], player[1].x, player[1].y, 80, 80)

      }, false);
    })
  })
  //img.src = `./assets/avatars/a${value.toString()}.png`

  //console.log(gameState)
}








const avatarHandler = {
  set(obj, prop, value) {

    socket.emit('message', obj)
    return Reflect.set(...arguments);
  }
}





//console.log(avatarMovement.dir)



// let avatarMovement = { speed: 0, dir: "none" }
//const avatarMovementProxy = new Proxy(avatarMovement, avatarHandler)  


function generateServerMob(mob) {
  //{x, y, value, id}
  return new Collectible({ x: mob.x, y: mob.y, value: mob.value, id: mob.id })

}

let obj = keyBoard.movement;
let players = {}
let testObj = new Proxy(obj, avatarHandler)
let avatarId = Date.now();
let avatar = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: avatarId, speed: 0 });
keyBoard.listener()
/* socket.on("connected",()=>{
let avatarId = Date.now();//
avatar = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: avatarId, speed: 0 });  
}) */


let item = {};
item.value = 0// initialize value before tick to avoid console error





socket.on("connetcion",()=>{
players={}
})

socket.emit("newPlayerConnects", avatar)

socket.on('tick', (gameState) => {

  socket.volatile.emit("currPlayerState", avatar)
  item = gameState.mob;
  //testgfhfhfhlmùlmùlù




  Object.entries(gameState.players).forEach(player => {
    //players = {}
    //if (player[1].x != players[player[0]].x || player[1].y != players[player[0]].y) {players.push(player[1]); console.log(players)}
    players[player[0]] = player[1]
    players[avatar.id] = avatar

  })


})

socket.on("playerDisconected", (playerId) => {
  players = {}
  delete players[playerId]
})

 
//console.clear()  
socket.io.on("reconnect", () => {
  players = {}//
}) 

//console.clear()
console.log(players)
//

function play() {
  
  
  keyBoard.keyboardInput(canvas, avatar, avatar)
  avatar.movePlayer(avatar.dir, avatar.speed)

  if (avatar.collision(item) == true) {

    let trigger = true;
    socket.emit('collisionTrigger', avatar.id)
    keyBoard.movement.dir = "none"
    keyBoard.movement.speed = 0;
    console.log(avatar.score)
  }


  socket.emit("currPlayerState", avatar)
  drawMobs(ctx, players)
  drawStaticObject(item)
requestAnimationFrame(play);
}

play()









