//file separation to meet exercise requirements
class Squares {
    constructor(game){
        this.game = game;
        this.canvas = canvas;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        
        this.width = Math.floor(Math.random() * 69) + 1;
        this.height = Math.floor(Math.random() * 69) + 1;
        
        this.speed = 3;
        this.angle = (Math.floor(Math.random()* 359) + 1) / Math.PI * 180;
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
        /* #FF008E
        ctx.fillStyle = '#ededed';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log('newsquare'); */
    }
};
