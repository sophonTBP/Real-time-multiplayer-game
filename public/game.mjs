import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import KeyBoard from "./KeyboardInputs.mjs"
//const socket = io();


const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

let width = document.getElementById("game-window").clientWidth
let height = document.getElementById("game-window").clientHeight

let keyBoard = new KeyBoard()



function generateMob() {

  let randomValue = Math.floor((Math.random() * 4))
  let randomX = Math.floor((Math.random() * 560))
  let randomY = Math.floor((Math.random() * 250) + 150)
  let id = Date.now()
  //{x, y, value, id}
  return new Collectible({x:randomX, y:randomY, value:randomValue,id: id})



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
let avatarId = Date.now()
let avatar = new Player({x:10, y:10, width:80, height: 80,score: 0, id:avatarId})

let mob = generateMob()


function play() {
  keyBoard.listener()
  let avatarMovement = { speed: avatar.speed, dir: avatar.dir }

  keyBoard.keyboardInput(canvas, avatarMovement, avatar)
  avatar.movePlayer(avatarMovement.dir, avatarMovement.speed )
  drawPlayer(ctx, avatar)
  if (avatar.collision(mob) == true) {
    console.log(avatar.score)
    mob = generateMob()
  }
  drawMob(mob)
  
  requestAnimationFrame(play);
}


play()


