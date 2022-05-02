class Collectible {
  constructor({x, y, value, id}) {
    Object.assign(this, {x, y, value, id}) 
this.width=50;
this.height=50;

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
