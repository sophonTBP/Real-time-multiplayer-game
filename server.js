require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require("helmet");
const nocache = require("nocache")
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');
const { default: Player } = require('./public/Player.mjs');

const app = express();
//

function customHeaders( req, res, next ){
  // Switch off the default 'X-Powered-By: Express' header
  //app.disable( 'x-powered-by' );

  // OR set your own header here
  res.setHeader( 'X-Powered-By', 'PHP 7.4.3' );

  // .. other headers here

  next()
}

app.use(nocache())
app.use(
  helmet({
    referrerPolicy: { policy: "same-origin" },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        //defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "cdn.socket.io"],
        objectSrc: ["'none'"],

      }
    }
    ,
    //, frameguard: {
    // action: "sameorigin",
    //}
    //,dnsPrefetchControl:{
    // allow: false,
    //},
    noSniff: true,
  })
);
//



app.use( customHeaders )



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
  const io = require('socket.io')(server, {
    cors: { origin: "*" }
  });
  function generateItem() {

    let randomValue = Math.floor((Math.random() * 4))
    let randomX = Math.floor((Math.random() * 560))
    let randomY = Math.floor((Math.random() * 440))
    let id = Date.now()

    return new Collectible({ x: randomX, y: randomY, value: randomValue, id: id })

  }

  let idTable = {}
  let playerIdList = []
  let gameState = {}
  let item = generateItem()
  gameState.item = item;
  gameState.players = {};
  gameState.scoreList = {}
  gameState.rank = [];


  io.on('connection', (socket) => {
    let playerId = Date.now()
    let player = new Player({ x: 10, y: 10, width: 80, height: 80, score: 0, id: playerId, speed: 0 })
    console.log(player.id + ' a user connected');
    idTable[socket.id] = player.id;
    gameState.players[playerId] = player;
   // socket.volatile.emit("tick", gameState);
    //socket.emit("tick", gameState)
    //
    io.to(socket.id).emit("handShake", player)

    socket.on('collisionTrigger', (playerId) => {
      
      item = generateItem()
      gameState.item = item
      gameState.players[playerId].score += 1
      socket.emit("tick", gameState)
    })
    ///L/

    socket.on('currPlayerState', (player) => {

      gameState.players[player.id] = player;
    });

    socket.on("disconnect", () => {

      console.log(idTable[socket.id] + ' was deleted');
      playerIdList.pop(player.id)
      delete gameState.players[idTable[socket.id]];

      socket.broadcast.emit("playerDisconected", player.id)
    })
    setInterval(() => {
      socket.volatile.emit("tick", gameState);
    }, 1000/55 )


  });

}

main()
module.exports = app; 
