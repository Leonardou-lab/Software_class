/*
 * Simple implementation of the PONG game
 *
 * María Espínola
 * 2025-03-13
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime;

let ballSpeed = 8;

let paddleSpeed = 5;

class Ball extends GameObject{
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "Ball", sheetCols);
        this.velocity = new Vector(100, 0);
    }
    update(deltaTime){
        this.velocity = this.velocity.normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
        this.updateCollider();
    }
    reset(){
        this.position = new Vector(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vector(0, 0);
    }
    serve(){
        this.velocity.y = (Math.random() - 0.5) * ballSpeed;
        if(Math.random() < 0.5){
            this.velocity.x = ballSpeed;
        } else {
            this.velocity.x = -ballSpeed;
        }
    
    }
}
class Border extends GameObject{
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "Border", sheetCols);
    }
    update(deltaTime){
        this.updateCollider();
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
// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
        this.motion = {
            up: {
                axis: "y",
                sign: -paddleSpeed,
            },
            down: {
                axis: "y",
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
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight) {
            this.position.y = canvasHeight - this.height;
        } else if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
        this.scoreLeft = 0;
        this.scoreRight = 0;
        this.inplay = false;
    }

    // Create the objects in the game
    initObjects() {
        this.paddleLeft = new Paddle(new Vector(50, canvasHeight / 2), 40, 100, "red");
        this.paddleRight = new Paddle(new Vector(canvasWidth - 50, canvasHeight / 2), 40, 100, "blue");

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2), 20, 20, "black");
        this.borderTop = new Border(new Vector(canvasWidth/2, 0), canvasWidth, 10, "yellow");
        this.borderBottom = new Border(new Vector(canvasWidth/2, canvasHeight), canvasWidth, 10, "yellow");
        this.goalLeft = new Goal(new Vector(0, canvasHeight/2), 10, canvasHeight, "green");
        this.goalRight = new Goal(new Vector(canvasWidth, canvasHeight/2), 10, canvasHeight, "green");
        this.actors = [
            this.paddleLeft,
            this.paddleRight,
            this.ball,
            this.borderTop,
            this.borderBottom,
            this.goalLeft,
            this.goalRight
        ];
    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
    }

    update(deltaTime) {
        // Move the paddles
        this.paddleLeft.update(deltaTime);
        this.paddleRight.update(deltaTime);
        this.ball.update(deltaTime);

        // Check collision against other objects
        if (boxOverlap(this.paddleLeft, this.ball) || boxOverlap(this.paddleRight, this.ball)) {
            this.ball.velocity.x *= -1;
            this.ball.velocity.y += (Math.random() - 0.5) * 5;
        }
        if(boxOverlap(this.borderTop, this.ball) || boxOverlap(this.borderBottom, this.ball)){
            this.ball.velocity.y *= -1;
        }
        if(boxOverlap(this.goalLeft, this.ball)){
            this.scoreRight++;
            this.ball.reset();
            this.inplay = false; 
        }
        if(boxOverlap(this.goalRight, this.ball)){
            this.scoreLeft++;
            this.ball.reset();
            this.inplay = false; 
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.addKey('up', this.paddleLeft);
            } if (event.key == 's') {
                this.addKey('down', this.paddleLeft);
            } if (event.key == 'ArrowUp') {
                this.addKey('up', this.paddleRight);
            } if (event.key == 'ArrowDown') {
                this.addKey('down', this.paddleRight);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.delKey('up', this.paddleLeft);
            } if (event.key == 's') {
                this.delKey('down', this.paddleLeft);
            } if (event.key == 'ArrowUp') {
                this.delKey('up', this.paddleRight);
            } if (event.key == 'ArrowDown') {
                this.delKey('down', this.paddleRight);
            }
        });

        window.addEventListener('keydown', (event) => {  // arrow function mantiene el this
            if (event.key === ' ') {
                if(!this.inplay){
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
    let deltaTime = 1;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}