/* global variables */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ship;
let speed;
//let angle = 90 / 180 * Math.PI; // this is used to convert an angle number into RADIANS
let radius;

let squares = [];
let octagon = [];
let pentagon = [];
let lasers = [];

/* game assets - these will be moved onto classes.js file */
class Ship {
    constructor(){
        this.game = game;
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed = 0;
        this.angle = 90 / 180 * Math.PI;
        this.radius = 32;
    }
    draw(){
        ctx.strokeStyle = '#008080';
        ctx.fillStyle = '#008080';
        /* ctx.beginPath();
        ctx.moveTo(this.x, this.y); // this is the initial point for the static triangle
        ctx.lineTo(this.x + 69, this.y);
        ctx.lineTo(this.x, this.y + 69);
        ctx.fill(); */
        ctx.beginPath(); // formula for Equilateral triangle provided by freeCodeCamp
            ctx.moveTo( // tip of the triangle
                this.x + 4 / 3 * this.radius * Math.cos(this.angle),
                this.y - 4 / 3 * this.radius * Math.sin(this.angle)
            );
            ctx.lineTo( // bottom left triangle corner point
                this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),
                this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))
            );
            ctx.lineTo( // bottom right triangle corner point
                this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),
                this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))
            );
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();
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
        this.intervalId = setInterval( () => {
            this.update();
        }, 1000 / 60);
    }
    update(){
        /* this.canvas = canvas; */
        this.ship.draw();
        this.createEnemies();
    }
    createEnemies(){
        const squares = new Squares();
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