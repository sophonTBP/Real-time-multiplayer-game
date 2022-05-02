
export class KeyBoard {

    constructor() {
        this.keyPad = { rightPressed: false, leftPressed: false, upPressed: false, downPressed: false };


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

        e.preventDefault();
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

        e.preventDefault();


    }
    listener() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }




    // manages keyBoard inputs and collisions with the game borders


    keyboardInput(canvas, playerMovement, gridPosition) {
        let width = 80;
        let height = 80;

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