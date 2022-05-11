import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import KeyBoard from "./KeyboardInputs.mjs"



function preload() {

  let arr = []
  for (var i = 0; i < arguments.length; i++) {
    let obj = new Image();
    obj.src = arguments[i];
    arr[i] = obj;

  }
  return arr
}


let collectibles = preload(
  "./assets/collectibles/c0.png",
  "./assets/collectibles/c1.png",
  "./assets/collectibles/c2.png",
  "./assets/collectibles/c3.png"
)
let avatars = preload(
  "./assets/avatars/a0.png",
  "./assets/avatars/a1.png",
  "./assets/avatars/a2.png"

)



const socket = io();

const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

let width = document.getElementById("game-window").clientWidth
let height = document.getElementById("game-window").clientHeight

let keyBoard = new KeyBoard();

let refreshPlayercount = false;




let obj = keyBoard.movement;

let playerTotalNum = 0;


let avatar = {};
keyBoard.listener();
let item = {};
item.value = 0;// initialize value before tick to avoid loging error to the console
let itemImg = new Image();
itemImg.onload = function () {

  //ctx.imageSmoothingEnabled = true;

  ctx.shadowColor = 'white';
  ctx.shadowBlur = 35;

  //requestAnimationFrame(play)
};
// }
let players = {};
let images = []

itemImg.src = collectibles[item.value.toString()].src
//ctx.clearRect(0, 0, canvas.width, canvas.height)

//

let colors = ["blue", "red", "yellow", "green"]

let value = 0;








let playerList = [];

let rank;

socket.on("handShake", (player) => {
  avatar = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: player.id, speed: 0 })
  //players = {}
  //playerList.push(avatar)

})


let playerRank;


socket.on('tick', (gameState) => {
  refreshPlayercount = false;

  socket.volatile.emit("currPlayerState", avatar);
  players = {}

  playerList = [];
  images = []
  /* item.value = gameState.item.value;
  item.id = gameState.item.id;
  item.width = gameState.item.width;
  item.height = gameState.item.height; */

  rank = gameState.rank;
  //item.x = gameState.item.x;
  //item.y = gameState.item.y;
  item = { ...gameState.item }

  Object.values(gameState.players).forEach(player => {

    players[player.id] = player;
    playerList = Object.values(gameState.players);
    //console.log(playerList)

  })



  playerTotalNum = playerList.length
  if (avatar.score == 0) {
    playerRank = `Rank: ${playerList.length}/${playerList.length}`;
  }
  if (avatar.score != 0) {
    playerRank = avatar.calculateRank(playerList);
  }



  document.getElementById("score_display").innerHTML = avatar.score;
  document.getElementById("rank_display").innerHTML = playerRank;
})





socket.on("playerDisconected", (playerId) => {
  refreshPlayercount = true
  players = {};
  delete players[playerId];
  //playerList = []
})



socket.io.on("connection_err", () => {
  console.log("connection_err")
  players = {};
  avatar = {};
  playerList = []
  //images = []
})



let update = true;



//



const createPlayerImgs = (canvas, ctx, playerList) => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (playerList) {
    let len = playerList.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let idx = 0; idx < len; idx++) {

      
      avatars[idx].value = idx;
      avatars[idx].dx = playerList[idx].x
      avatars[idx].dy = playerList[idx].y
      
      if (avatars[idx].complete) { ctx.drawImage(avatars[idx], avatars[idx].dx, avatars[idx].dy, 80, 80); }
      /*  */





    }

    // drawPlayerImgs(ctx, images);
  }

}






setTimeout(()=>{
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


  //ctx.drawImage(img, img.dx, img.dy, item.width, item.height)




  /* for(let idx=0;idx<images.length;i++){
    ctx.drawImage(images[idx], images[idx].dx, images[idx].dy, 80, 80)
  } */

  createPlayerImgs(canvas, ctx, playerList, images)
  ctx.drawImage(itemImg, item.x, item.y, item.width, item.height)

}

play()
},200)











