const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArr =[];

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let mouse = {
    x:null,
    y:null
}

canvas.addEventListener('mousemove',function (event){
    mouse.x =event.x;
    mouse.y =event.y;
    for (let i = 0; i < 10; i++) {
        particlesArr.push(new Particles())
    }
})


class Particles{
    constructor(){
        this.x= mouse.x;
        this.y=mouse.y;
        this.size = Math.random() *5 +1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x +=this.speedX;
        this.y +=this.speedY;
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}

function draw(){
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].draw();
        particlesArr[i].update();
        if(particlesArr[i].size <= 0.3){
            particlesArr.splice(i,1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw()
    requestAnimationFrame(animate)
}
animate()

