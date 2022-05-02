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
  return new Collectible(randomX, randomY, randomValue, id)



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
let playerId = Date.now()
let player = new Player(10, 10, 0, playerId, 0)

let mob = generateMob()


function play() {
  keyBoard.listener()
  let playerMovement = { speed: player.speed, dir:player.dir }
  keyBoard.keyboardInput(canvas, playerMovement, player)
  player.movePlayer(playerMovement.dir, playerMovement.speed)
  drawPlayer(ctx, player)
  drawMob(mob)
  requestAnimationFrame(play);
}


play()


