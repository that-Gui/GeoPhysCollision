/* global variables */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ship;
let speed;
let angle;

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
        this.angle = 0;
        this.strokeColor = 'white';
    }
    draw(){
        this.ctx = ctx;
        this.fillStyle =
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
        this.ship = new Ship( bla, bla, bla, bla);
        this.intervalId = setInterval( () => {
            this.update();
        }, 1000 / 60);
    }
    update(){
        this.ship.draw();
        this.createEnemies();
    }
    createEnemies(){

    }
};

/* game start */
window.onload = () => {
    document.getElementById('startbtn').onclick = () => {
        startGame();
    };
    
    function startGame() {
        const game = new Game();
        game.start();
    };
};