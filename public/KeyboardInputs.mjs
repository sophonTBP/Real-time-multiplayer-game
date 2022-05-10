
export class KeyBoard {

    constructor() {
        this.keyPad = { rightPressed: false, leftPressed: false, upPressed: false, downPressed: false };

        this.movement = { dir: "none", speed: 0 }
    }



    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.keyPad.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.keyPad.leftPressed = true;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            
            this.keyPad.upPressed = true;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
            this.keyPad.downPressed = true;
            
        }

        
    }
    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.keyPad.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.keyPad.leftPressed = false;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            
            this.keyPad.upPressed = false;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
            
            this.keyPad.downPressed = false;
        }

        //e.preventDefault();


    }



    /* keyDownHandler2(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.movement.dir = "right";
            this.movement.speed = 7;
            return this.movement;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.keyPad.leftPressed = true;
            this.movement.dir = "left";
            this.movement.speed = 7;
            return this.movement
        } else if (e.key == "Up" || e.key == "ArrowUp") {

            this.movement.dir = "up";
            this.movement.speed = 7;
            return this.movement;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
            this.movement.dir = "down";
            this.movement.speed = 7;
            return this.movement;
        }

        e.preventDefault();
    }
    keyUpHandler2(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.movement.dir = "none";
            this.movement.speed = 0;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.movement.dir = "none";
            this.movement.speed = 0;
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            this.movement.dir = "none";
            this.movement.speed = 0;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
            this.movement.dir = "none";
            this.movement.speed = 0;
        }

        e.preventDefault();


    } */
    listener() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        /* document.addEventListener("keydown", this.keyDownHandler2.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler2.bind(this), false); */
    }




    // manages keyBoard inputs and collisions with the game borders

    /* getPlayerMovement(canvas, playerMovement, gridPosition) {
        this.listener()
        let width = 80;
        let height = 80;
        playerMovement.speed = 0;
        const right = () => {
            if (gridPosition.x + width >= canvas.width) {
                this.movement.speed = 0;
               // return this.movement
            }
            this.movement.speed = 7;
            this.movement.dir = "right";
            //return this.movement
        };

        const left = () => {
            if (gridPosition.x <= 0) {
                this.movement.speed = 0;
                //return this.movement
            }

            this.movement.speed = 7;
            this.movement.dir = "left";
           // return this.movement
        };

        const up = () => {

            if (gridPosition.y <= 0) {
                this.movement.speed = 0;
               // return this.movement
            }
            this.movement.speed = 7;
            this.movement.dir = "up";
           // return this.movement
        };

        const down = () => {

            if (gridPosition.y + height >= canvas.height) {
                this.movement.speed = 0
                //return this.movement
            }
            this.movement.speed = 7;
            this.movement.dir = "down";
           // return this.movement
        };

        if (this.keyPad.rightPressed) {
            right();

        };
        if (this.keyPad.leftPressed) {
            left();

        };
        if (this.keyPad.upPressed) {
            up();

        };
        if (this.keyPad.downPressed) {
            down();

        };


        if (this.keyPad.rightPressed && this.keyPad.upPressed) {
            this.movement.speed = 7;
            this.movement.dir = "rightup"
            if (gridPosition.x + width >= canvas.width) {
                up();
                //return this.movement
            }
            if (gridPosition.y <= 0) {
                right();
                //return this.movement
            }
        }
        if (this.keyPad.rightPressed && this.keyPad.downPressed) {
            this.movement.speed = 7;
            this.movement.dir = "rightdown"
            if (gridPosition.x + width >= canvas.width) {
                down();
                //return this.movement

            }
            if (gridPosition.y + height >= canvas.height) {
                right();
                //return this.movement
            }
        }

        if (this.keyPad.leftPressed && this.keyPad.upPressed) {
            this.movement.speed = 7;
            this.movement.dir = "leftup"
            if (gridPosition.x <= 0) {
                up();
               // return this.movement
            }
            if (gridPosition.y <= 0) {
                left();
               // return this.movement
            }
        }
        if (this.keyPad.leftPressed && this.keyPad.downPressed) {
            this.movement.speed = 7;
            this.movement.dir = "leftdown"
            if (gridPosition.x <= 0) {
                down();
               // return this.movement
            }
            if (gridPosition.y + height >= canvas.height) {
                left();
                //return this.movement
            }
        } else {
            this.movement.dir = "none"
            this.movement.speed = 0
            //return this.movement
        }
        //return this.movement
    } */

    
    keyboardInput(canvas, playerMovement, gridPosition) {

        let width = 80;
        let height = 80;
        playerMovement.speed = 0;
        const right = () => {
            if (gridPosition.x + width >= canvas.width) {
                playerMovement.speed = 0;
                return playerMovement;
            }
            playerMovement.speed = 7;
            playerMovement.dir = "right";
            return playerMovement;
        };

        const left = () => {
            if (gridPosition.x <= 0) {
                playerMovement.speed = 0;
                return playerMovement;
            }

            playerMovement.speed = 7;
            playerMovement.dir = "left";
            return playerMovement;
        };

        const up = () => {

            if (gridPosition.y <= 0) {
                playerMovement.speed = 0;
                return playerMovement;
            }
            playerMovement.speed = 7;
            playerMovement.dir = "up";
            return playerMovement;
        };

        const down = () => {

            if (gridPosition.y + height >= canvas.height) {
                playerMovement.speed = 0
                return playerMovement
            }
            playerMovement.speed = 7;
            playerMovement.dir = "down";
            return playerMovement
        };

        if (this.keyPad.rightPressed) {
            playerMovement = right();
        };
        if (this.keyPad.leftPressed) {
            playerMovement = left();
        };
        if (this.keyPad.upPressed) {
            playerMovement = up();
        };
        if (this.keyPad.downPressed) {
            playerMovement = down();
        };


        if (this.keyPad.rightPressed && this.keyPad.upPressed) {
            playerMovement.speed = 7;
            playerMovement.dir = "rightup"
            if (gridPosition.x + width >= canvas.width) {
                playerMovement = up();
            }
            if (gridPosition.y <= 0) {
                playerMovement = right();

            }
        }
        if (this.keyPad.rightPressed && this.keyPad.downPressed) {
            playerMovement.speed = 7;
            playerMovement.dir = "rightdown"
            if (gridPosition.x + width >= canvas.width) {
                playerMovement = down();

            }
            if (gridPosition.y + height >= canvas.height) {
                playerMovement = right();
            }
        }

        if (this.keyPad.leftPressed && this.keyPad.upPressed) {
            playerMovement.speed = 7;
            playerMovement.dir = "leftup"
            if (gridPosition.x <= 0) {
                playerMovement = up();

            }
            if (gridPosition.y <= 0) {
                playerMovement = left();

            }
        }
        if (this.keyPad.leftPressed && this.keyPad.downPressed) {
            playerMovement.speed = 7;
            playerMovement.dir = "leftdown"
            if (gridPosition.x <= 0) {
                playerMovement = down();

            }
            if (gridPosition.y + height >= canvas.height) {
                playerMovement = left();

            }
        }


    }
}
export default KeyBoard