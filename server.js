

require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');


const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});




function main() {


  const player = require("./public/Player.mjs")
  const Collectible = require("./public/Collectible.mjs")
  //Collectible.Collectible

  const io = require('socket.io')(server, {
    cors: { origin: "*" }
  });

  function generateMob() {

    let randomValue = Math.floor((Math.random() * 4))
    let randomX = Math.floor((Math.random() * 560))
    let randomY = Math.floor((Math.random() * 440) )
    let id = Date.now()
    //{x, y, value, id}lmkkm
    return new Collectible({ x: randomX, y: randomY, value: randomValue, id: id })



  }
  let idTable = {}
  let playerIdList = []
  let gameState = {}
  let mob = generateMob()
  gameState.mob = mob
  
  io.on('connection', (socket) => {
  gameState.players = {}

    //socket.emit("tick", gameState)
     socket.on("newPlayerConnects", (player) => {
      console.log(player.id + ' a user connected');
      idTable[socket.id] = player.id;
      playerIdList.push(player.id)
      //console.log(idTable)
      gameState.players[player.id] = player;

    }); 

//yyujkljkl
    socket.on('collisionTrigger', (avatarId) => {

      mob = generateMob()
      gameState.mob = mob
      gameState.players[avatarId].score+=1
      socket.emit("tick", gameState)
    })


    socket.on('currPlayerState', (player) => {

      gameState.players[player.id] = player;

    });

    socket.on("disconnect", () => {

      console.log(idTable[socket.id] + ' was deleted');
      playerIdList.pop(player.id)
      delete gameState.players[idTable[socket.id]];
      socket.broadcast.emit("playerDisconected",player.id)
    })
    setInterval(() => {

      socket.volatile.emit("tick", gameState);

    }, 1000 / 60)

    //console.log(gameState)
  });

}

main()
module.exports = app; // For testing
