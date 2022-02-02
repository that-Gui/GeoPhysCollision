//file separation to meet exercise requirements
class Ship {
    constructor(game){
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
