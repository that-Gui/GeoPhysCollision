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
class Ship {
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
    }
};

class Squares {
    constructor(){
        this.game = game;
        this.canvas = canvas;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        
        this.width = Math.floor(Math.random() * 99) + 1;
        this.height = Math.floor(Math.random() * 99) + 1;
        
        this.speed = 0.3;
        this.angle = (Math.floor(Math.random()* 359) + 1) / Math.PI * 180;
        this.rocketFuel = true;
        this.rocketFuelX = 0;
        this.rocketFuelY = 0;
        this.radius;
    }  
    update(){
        this.x += this.rocketFuelX;
        this.y += this.rocketFuelY;
        if(this.rocketFuel){
        this.rocketFuelX += this.speed * Math.cos(this.angle);
        this.rocketFuelY -= this.speed * Math.sin(this.angle);
        }
    }
    draw(){
        ctx.fillStyle = '#ededed';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log('newsquare');
    }
};



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
        this.ship = new Ship();
        this.keyboardEvent();
        this.gameOver();
        this.intervalId = setInterval( () => {
            this.update();
        }, 1000 / 60);
    }
    update(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ship.draw();
        this.ship.update();
        this.createEnemies();
      
        squaresArray.forEach((square) => {
            square.draw();
            square.update();
          });
        
        
        this.frameCounter ++;
        console.log('frameCounter');
        if (this.ship.x < 0 - this.ship.radius) {
            this.ship.x = canvas.width + this.ship.radius;
        } else if (this.ship.x > canvas.width + this.ship.radius) {
            this.ship.x = 0 - this.ship.radius;
        }
        if (this.ship.y < 0 - this.ship.radius) {
            this.ship.y = canvas.height + this.ship.radius;
        } else if (this.ship.y > canvas.height + this.ship.radius) {
            this.ship.y = 0 - this.ship.radius;
        }
    }
    createEnemies(){
        if (this.frameCounter % 300 === 0) {
            squaresArray.push(new Squares());
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
            console.log('up');
                    break;
                
            }
        })
    }
    gameOver(){

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