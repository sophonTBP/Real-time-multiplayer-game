import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import KeyBoard from "./KeyboardInputs.mjs"


const socket = io();

const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

let width = document.getElementById("game-window").clientWidth
let height = document.getElementById("game-window").clientHeight

let keyBoard = new KeyBoard();

let mob = {};

function generateMob() {

  let randomValue = Math.floor((Math.random() * 4))
  let randomX = Math.floor((Math.random() * 560))
  let randomY = Math.floor((Math.random() * 250) + 150)
  let id = Date.now()
  //{x, y, value, id}
  return new Collectible({ x: randomX, y: randomY, value: randomValue, id: id })



}

function drawMob(mob) {
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



function drawPlayer(ctx, currPlayerPosition) {

  let value = 0;
  let img = new Image();
  img.addEventListener('load', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.imageSmoothingEnabled = true;
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 15;
    ctx.drawImage(img, currPlayerPosition.x, currPlayerPosition.y, 80, 80)

  }, false);
  img.src = `./assets/avatars/a${value.toString()}.png`

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















let item = {};



let obj = keyBoard.movement;


let testObj = new Proxy(obj, avatarHandler)
//console.log(testObj)

let avatarId = Date.now();
let avatar = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: avatarId, speed: 0 });


setTimeout(() => {
  socket.emit("requestTick", "world")
}, 1000 / 20)


//
//
function play() {
  requestAnimationFrame(play);
  keyBoard.listener()
  keyBoard.keyboardInput(canvas, avatar, avatar)
  avatar.movePlayer(avatar.dir, avatar.speed)
  drawPlayer(ctx, avatar)
  
  

  socket.on('tick', gameState => {
    item = gameState;
    let avatarMovement = { speed: 0, dir: "" }

    //console.log("gameState: ");
    //console.log(gameState);
  
   
    
  })



drawMob(item)  

if (avatar.collision(item) == true) {
      //console.log(avatar.score)
      let trigger = true;
      socket.emit('collisionTrigger', trigger)
      keyBoard.movement.dir = "none"
      keyBoard.movement.speed = 0;
    }



}
play()







