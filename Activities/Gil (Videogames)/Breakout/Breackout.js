
"use strict";

const canvasWidth = 800;
const canvasHeight = 600;

let ctx;
let game;
let oldTime = 0;
let initialSpeed = 0.2;
let ballSpeed = 0.2;
let paddleSpeed = 0.3;
let speedIncrease = 1.05;


class Ball extends GameObject{
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "Ball", sheetCols);
        this.velocity = new Vector(100, 0);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(ballSpeed).times(deltaTime));
        this.updateCollider();
        
    }
    reset(){
        this.position.x = canvasWidth/2;
        this.position.y = canvasHeight/2;
        this.velocity.x = 0;
        this.velocity.y = 0;

        }
    serve(){
        let angle = Math.PI/4 + Math.random() * Math.PI/2;
        this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
        ballSpeed = initialSpeed;

        if(Math.random() > 0.5){
            this.velocity.x *= -1;
        }
        console.log(this.velocity);
    
    }
}

class Border extends GameObject{
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "Ball", sheetCols);
    }
    update(deltaTime){
        this.updateCollider();
        this.clampWithinCanvas();
    }


}
class Goal extends GameObject{
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "Goal", sheetCols);
    }
    update(deltaTime){
        this.updateCollider();
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
        this.motion = {
            left: {
                axis: "x",
                sign: -paddleSpeed,
            },
            right: {
                axis: "x",
                sign: paddleSpeed,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
        this.updateCollider();
        
    }

    clampWithinCanvas() {
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}

class PowerUp extends GameObject {
    constructor(position, width, height, color, type, sheetCols) {
        super(position, width, height, color, "powerUp", sheetCols);
        this.type = type;        
        this.velocity = new Vector(0, 1);
        this.dropSpeed = 0.15;
    }


    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(this.dropSpeed).times(deltaTime));
        this.updateCollider();

    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.counterLifes = 3;
        this.inplay = false;
        this.counterBricks = 0;
        this.game_over = false;
        this.level = 1;
        this.gamewon = false;
        this.powerups = [];
        this.extraBalls = [];
        this.createEventListeners();
        this.initObjects();

        this.bricksdestroyed = new TextLabel(20,580,"20px Arial", "black")
        this.currentlevel = new TextLabel(20,550,"20px Arial", "black")
        this.lifes = new TextLabel(20,520,"20px Arial", "black")
        this.gameoverlabel = new TextLabel(canvasWidth-520, 400,"40px Arial", "black")
        this.winlabel = new TextLabel(canvasWidth-520, 400,"40px Arial", "gold")

    
        //initialize sound elements
        this.ping = document.createElement("audio");
        this.ping.src = "libs/4387__noisecollector__pongblipe4.wav";
        //make the sound repeat when it finishes. good for background musica


    }

    initObjects() {
        this.paddlemain = new Paddle(new Vector( canvasWidth/2, canvasHeight-50), 100,40, "purple");
      
        this.bricks = [];
        this.powerups = [];
        this.extraBalls = [];
        const cols = 6;
        const rows = 2 + this.level;
        const colors = ["red", "blue", "green", "yellow", "orange"];

        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = 70 + col * 133;
            let y = 30 + row * 100;
            let brick = new Paddle(new Vector(x, y), 100, 40, colors[row % colors.length]);
            

            if ( Math.random() < 0.15){
                brick.powerup = "life";

            }else if ( Math.random() < 0.25) {
                brick.powerup = "multiball";

            }else{ 
                brick.powerup = null;
            }
            
            this.bricks.push(brick);
        }
    }
    

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight/2), 10, 10, "black");
        this.borderTop = new Border(new Vector(canvasWidth/2, 0), canvasWidth, 10, "navyblue");
        this.borderBottom = new Border(new Vector(canvasWidth/2, canvasHeight), canvasWidth, 10, "navyblue");
        this.goalLeft = new Goal(new Vector(0, canvasHeight/2), 10, canvasHeight, "navyblue");
        this.goalRight = new Goal(new Vector(canvasWidth, canvasHeight/2), 10, canvasHeight, "navyblue");
        this.actors = [
            this.paddlemain,
            ...this.bricks,
            this.ball,
            this.borderTop,
            this.borderBottom,
            this.goalLeft,
            this.goalRight
        ];
    }


    draw(ctx) {

        this.bricksdestroyed.draw(ctx, `Bricks: ${this.counterBricks}`)
        this.currentlevel.draw(ctx, `Level: ${this.level}`)
        this.lifes.draw(ctx, `Lifes: ${this.counterLifes}`)
        if(this.game_over){
             this.gameoverlabel.draw(ctx, `GAME OVER`)

        }
        if (this.gamewon == true){
            this.winlabel.draw(ctx, `YOU WIN !!`)
        }
       
        
        

        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        for (let p of this.powerups) {
            p.draw(ctx);

        }
        for (let eb of this.extraBalls) {
            eb.draw(ctx);
        }
    }

    update(deltaTime) {
    if (this.game_over || this.gamewon) 
        return;

    
   if (this.bricks.length === 0) {
    if (this.level === 3) {
        this.gamewon = true;
        this.inplay = false;
    } else {
        this.level++;
        this.inplay = false;
        this.initObjects();
    }
}


    // Move the paddles
    this.paddlemain.update(deltaTime);

    this.powerups = this.powerups.filter(p => {
    p.update(deltaTime);
    if (p.position.y > canvasHeight) return false;
    if (this.inplay && boxOverlap(this.paddlemain, p)) {
        if (p.type === "life") {
            this.counterLifes++;
        } else if (p.type === "multiball") {
            let b1 = new Ball(new Vector(this.ball.position.x, this.ball.position.y), 10, 10, "cyan");
            let b2 = new Ball(new Vector(this.ball.position.x, this.ball.position.y), 10, 10, "cyan");
            b1.velocity = new Vector(Math.SQRT1_2, -Math.SQRT1_2);
            b2.velocity = new Vector(-Math.SQRT1_2, -Math.SQRT1_2);
            this.extraBalls.push(b1, b2);
            
        }
        return false;
    }
    return true;
});

    // Only move ball and check collisions when in play
    if (this.inplay) {
        this.ball.update(deltaTime);

        if (boxOverlap(this.paddlemain, this.ball)) {
            const hitOffset = this.ball.position.x - this.paddlemain.position.x;
            this.ball.velocity.x = hitOffset / this.paddlemain.halfSize.x;
            this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
            ballSpeed *= speedIncrease;
            this.ping.play();
        }
        if (boxOverlap(this.borderTop, this.ball)) {
            this.ball.velocity.y *= -1;
            ballSpeed *= speedIncrease;
            this.ping.play();
        }
        if (boxOverlap(this.goalRight, this.ball) || boxOverlap(this.goalLeft, this.ball)) {
            this.ball.velocity.x *= -1;
            ballSpeed *= speedIncrease;
            this.ping.play();
        }
        if (boxOverlap(this.borderBottom, this.ball)) {
            this.counterLifes--;
            this.ball.reset();
            this.inplay = false;
            if (this.counterLifes <= 0) {
                this.game_over = true;
            }
        }

        this.extraBalls = this.extraBalls.filter(eb => {
            eb.update(deltaTime);
            if (boxOverlap(this.paddlemain, eb)){
                eb.velocity.y *= -1;
            }
                 
            if (boxOverlap(this.borderTop, eb)) {
                eb.velocity.y *= -1;
            }
                
            if (boxOverlap(this.goalLeft, eb) || boxOverlap(this.goalRight, eb)) {
                eb.velocity.x *= -1;
            }
            if (boxOverlap(this.borderBottom, eb)){
                return false;
            }
                 

            this.bricks = this.bricks.filter(brick => {
                if (boxOverlap(brick, eb)) {
                    eb.velocity.y *= -1;
                    this.counterBricks++;
                    if (brick.powerup) {
                        const puColor = brick.powerup === "life" ? "red" : "cyan";
                        this.powerups.push(new PowerUp(brick.position, 15, 15, puColor, brick.powerup));
                    }
                    return false;
                }
                return true;
            });

            return true;
        });

        this.bricks = this.bricks.filter(brick => {
            if (boxOverlap(brick, this.ball)) {
                this.ball.velocity.y *= -1;
                ballSpeed *= speedIncrease;
                this.ping.play();
                this.counterBricks += 1;
                if (brick.powerup) {
                    const puColor = brick.powerup === "life" ? "red" : "cyan";
                    this.powerups.push(new PowerUp(brick.position, 15, 15, puColor, brick.powerup));
                }
                return false;
            }
            return true;
        });

        this.actors = [
            this.paddlemain,
            ...this.bricks,
            this.ball,
            this.borderTop,
            this.borderBottom,
            this.goalLeft,
            this.goalRight
        ];
    }
}

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'a') {
                this.addKey('left', this.paddlemain);
            } if (event.key == 'd') {
                this.addKey('right', this.paddlemain);
            } 
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a') {
                this.delKey('left', this.paddlemain);
            } if (event.key == 'd') {
                this.delKey('right', this.paddlemain);
            }
        });

        window.addEventListener('keydown', (event) => {  
            if (event.key === ' ') {
                if (this.game_over) {
                    this.counterLifes = 3;
                    this.counterBricks = 0;
                    this.level = 1;
                    this.game_over = false;
                    this.initObjects();
                } else if (!this.inplay) {
                    this.ball.serve();
                    this.inplay = true;
                }
            }
        });
    }

    // Add the key pressed to the 'keys' array of the object sent
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed from the 'keys' array of the object sent
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}