class Collectible {
  constructor(x, y, value, id) {
this.x=x;
this.y=y;
this.width=50;
this.height=50;
this.value=value;
this.id=id;
  }

  
}



/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {
 
}

export default Collectible;
