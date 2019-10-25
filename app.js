let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

cvs.width = 768;
cvs.height = 512;
ctx.font = 'bold 30px sans-serif';
ctx.fillText("Нажмите старт для начала игры", cvs.width / 6, cvs.height / 2);

const player = new function () {
    this.x = cvs.width / 5;
    this.y = 0;
    this.w = 110;
    this.h = 100;
    this.grav = 5;
    this.img = new Image();
    this.img.src = "./img/2.png";
    this.draw = function () {
        if (this.y < ((cvs.height - 100) - 55)) player.y += this.grav;
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
};
const sky = new function () {
    this.img =  new Image();
    this.x = 0;
    this.y = 0;
    this.img.src = "./img/sky1.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y, cvs.width, cvs.height);
    };
};

const grass = new function () {
    this.x = 0;
    this.y = -20;
    this.img = new Image();
    this.img.src = "./img/ground.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y);
        if (this.x <= 0 && this.x >= -this.img.width + cvs.width) {
            this.x -= t+3;
        } else {
            this.x = 0;
        }
    };
};

const brick = new function () {
    this.x = cvs.width * 2;
    this.y = cvs.height - 160;
    this.rad = 100;
    this.img = new Image();
    this.img.src = "./img/bricks.png";
    this.draw = function () {
        ctx.drawImage(this.img, this.x, this.y,100,100);
        if (this.x > -100) {
            this.x-=t;
        } else {
            this.x = cvs.width + Math.floor(Math.random() * cvs.width);
        }
    };
};

let t = 15;

function loop() {

    sky.draw();

    ctx.fillStyle = "#663300"; // grow texture
    ctx.fillRect(0,cvs.height - 40, cvs.width, 40);

    ctx.fillStyle = "#003300";
    ctx.fillRect(0, cvs.height - 60, cvs.width, 20);

    if((Math.floor(player.x) + player.w >= brick.x &&
        Math.floor(player.x) <= brick.x + brick.rad) &&
        Math.floor(player.y) + player.h >= brick.y) {
            location.reload();
    }

    brick.draw();
    player.draw();
    grass.draw();

    requestAnimationFrame(loop);
}

onkeydown = e => {
    if ((e.key === "w" || e.key === "ц") && (player.y === 360)) player.y -= 230;
    if ((e.key === "d" || e.key === "в") && player.x < cvs.width - player.w) player.x += 20;
    if ((e.key === "a" || e.key === "ф") && player.x > 0) player.x -= 20;
};

document.getElementById("start").onclick = loop;