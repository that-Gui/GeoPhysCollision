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
const squares = [];
const octagon = [];
const pentagon = [];
const lasers = [];

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
        /* ctx.beginPath();
        ctx.moveTo(this.x, this.y); // this is the initial point for the static triangle
        ctx.lineTo(this.x + 69, this.y);
        ctx.lineTo(this.x, this.y + 69);
        ctx.fill(); */
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
        const squares = new Squares();
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