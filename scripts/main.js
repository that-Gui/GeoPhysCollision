/* global variables */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let speed;
let rocketFuel;
//let angle = 90 / 180 * Math.PI; // this is used to convert an angle number into RADIANS
let radius;

//enemies
const squaresArray = [];
const octagonArray = [];
const pentagonArray = [];
const lasersArray = [];

/* game assets - these will be moved onto classes.js file */
/* class Ship {
    constructor(){
        this.game = game;
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed = 0.3;
        this.angle = 90 / 180 * Math.PI;
        this.radius = 32;
        this.rotation = 0;
        this.rocketFuel = false;
        this.rocketFuelX = 0;
        this.rocketFuelY = 0;
    }
    draw(){
        ctx.shadowColor = '#008080';
        ctx.shadowBlur = '5';
        ctx.strokeStyle = '0';
        ctx.fillStyle = '#008080';
        ctx.beginPath(); // formula for Equilateral triangle provided by freeCodeCamp
            ctx.moveTo( // tip of the triangle
                this.x + 1.1 * this.radius * Math.cos(this.angle),
                this.y - 1.1 * this.radius * Math.sin(this.angle)
            );
            ctx.lineTo( // bottom left triangle corner point
                this.x - this.radius * (0.6 * Math.cos(this.angle) + Math.sin(this.angle)),
                this.y + this.radius * (0.6 * Math.sin(this.angle) - Math.cos(this.angle))
            );
            ctx.lineTo( // bottom right triangle corner point
                this.x - this.radius * (0.6 * Math.cos(this.angle) - Math.sin(this.angle)),
                this.y + this.radius * (0.6 * Math.sin(this.angle) + Math.cos(this.angle))
            );
            ctx.closePath();
            ctx.fill();
    }
    rotate() {
        this.angle += this.rotation;
    }
    update(){
        this.x += this.rocketFuelX;
        this.y += this.rocketFuelY;
        if(this.rocketFuel) {
            this.rocketFuelX += this.speed * Math.cos(this.angle);
            this.rocketFuelY -= this.speed * Math.sin(this.angle);
            
            ctx.fillStyle = '#ffaa00';
            ctx.shadowColor = '#ffaa00';
            ctx.shadowBlur = '8';
            ctx.strokeStyle = '0';
            ctx.beginPath();
            ctx.moveTo( 
                this.x - this.radius * (0.6 * Math.cos(this.angle) + 0.5 * Math.sin(this.angle)),
                this.y + this.radius * (0.6 * Math.sin(this.angle) - 0.5 * Math.cos(this.angle))
            );
            ctx.lineTo( 
                this.x - this.radius * 1.1 * Math.cos(this.angle),
                this.y + this.radius * 1.1 * Math.sin(this.angle)
            );
            ctx.lineTo( 
                this.x - this.radius * (0.6 * Math.cos(this.angle) - 0.5 * Math.sin(this.angle)),
                this.y + this.radius * (0.6 * Math.sin(this.angle) + 0.5 * Math.cos(this.angle))
            );
            ctx.closePath();
            ctx.fill();
        }
        if (this.x < 0 - this.radius) {
            this.x = canvas.width + this.radius;
        } else if (this.x > canvas.width + this.radius) {
            this.x = 0 - this.radius;
        }
        if (this.y < 0 - this.radius) {
            this.y = canvas.height + this.radius;
        } else if (this.y > canvas.height + this.radius) {
            this.y = 0 - this.radius;
        }
    }
};
 */
/* class Squares {
    constructor(){
        this.game = game;
        this.canvas = canvas;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        
        this.width = Math.floor(Math.random() * 69) + 1;
        this.height = Math.floor(Math.random() * 69) + 1;
        
        this.speed = 3;
        this.angle = (Math.floor(Math.random()* 359) + 1) / Math.PI * 180;
        this.rocketFuel = true;
        this.rocketFuelX = this.speed * Math.cos(this.angle);
        this.rocketFuelY = this.speed * Math.sin(this.angle);
        
    }  
    update(){
        this.x += this.rocketFuelX;
        this.y += this.rocketFuelY;

        if (this.x < 0 - this.width) {
            this.x = canvas.width + this.width;
        } else if (this.x > canvas.width + this.width) {
            this.x = 0 - this.width;
        }
        if (this.y < 0 - this.height) {
            this.y = canvas.height + this.height;
        } else if (this.y > canvas.height + this.height) {
            this.y = 0 - this.height;
        }
    }
    checkOnTop(){
        if (!(this.game.ship.x + 32 < this.x || this.game.ship.x > this.x + this.width || this.game.ship.y + 32 < this.y || this.game.ship.y > this.y + this.height)){ 
            this.x += 50;
         }
    }
    draw(){
        ctx.shadowColor = '#FF008E';
        ctx.shadowBlur = 8;
        ctx.strokeStyle = '#FF008E';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        #FF008E
        ctx.fillStyle = '#ededed';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log('newsquare');
    }
}; */



/* game logic */
class Game {
    constructor(){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.intervalId = null;
        this.frameCounter = 0;
    }
    start(){
        this.ship = new Ship(this);
        this.keyboardEvent();
        this.intervalId = setInterval( () => {
            this.update();
        }, 1000 / 60);
    }
    update(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ship.draw();
        this.ship.update();
        this.createEnemies();
      
        squaresArray.forEach((square, i) => {
            square.draw();
            square.update();
        
                    /* for (let x = 0; x < squaresArray.length; x++) {
                        if (square.x + square.width < squaresArray[x].x || square.x > squaresArray[x].x + squaresArray[x].width || square.y + square.h < squaresArray[x].y || square.y > squaresArray[x].y + squaresArray[x].height && i !== x){
                            console.log('shapecollision');
                            squaresArray[x].speed = -squaresArray[x].speed;
                            square.speed = -square.speed;
                    } */
               
        
        })
          
        
        this.frameCounter ++;
        
        //this.shapeCollision();
        
        this.gameOver();
    }
    createEnemies(){
        if (this.frameCounter % 690 === 0) {
            squaresArray.push(new Squares(this));
            squaresArray[squaresArray.length - 1].checkOnTop();
            console.log('square');
        }
        
    }
    keyboardEvent(){
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowRight': this.ship.angle -= 0.5;
                    break;
                case 'ArrowLeft': this.ship.angle += 0.5;
                    break;
                case 'ArrowUp': this.ship.rocketFuel = true;
                    break;
                
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'ArrowUp': this.ship.rocketFuel = false;
                    break;
                
            }
        })
    }
 /*    shapeCollision(){

        squaresArray.forEach((e) => {
            for (let x = 0; x < squaresArray.length; x++) {
                if (e.x || e.y === square[x].x || square[x].y){
                    square[x].speed = -square[x].speed;
                   e.speed = -e.speed;
                }
            }
        })
    } */
    gameOver(){
    squaresArray.forEach((square) => {
        if (!(this.ship.x + 32 < square.x || this.ship.x > square.x + square.width || this.ship.y + 32 < square.y || this.ship.y > square.y + square.height)){ 
            console.log('impact');
            
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = '13';
            ctx.strokeStyle = 'white';
            this.ctx.font = '144px JetBrains Mono';
            this.ctx.fillText('GameOver', canvas.width / 4, canvas.height / 2);
            
            
            clearInterval(this.intervalId);
            
        }
        })
        
    }
};

/* game start */
/* window.onload = () => {
    document.getElementById('startbtn').onclick = () => {
        startGame();
    };
    
    function startGame() {
        const game = new Game();
        game.start();
    };
}; */

const game = new Game();
game.start();