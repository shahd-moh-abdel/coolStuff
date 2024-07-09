const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function resizeCanvas() {
    
    // Get the device pixel ratio, falling back to 1 if not available
    const dpr = window.devicePixelRatio || 1;
    
    // Get the size of the canvas in CSS pixels
    const rect = canvas.getBoundingClientRect();
    
    // Give the canvas pixel dimensions of their CSS size * the device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale all drawing operations by the dpr
    ctx.scale(dpr, dpr);
    
    // Set the canvas style to fill the window
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
}

// Call the resizeCanvas function when the window is resized
window.addEventListener('resize', resizeCanvas);

// Initial call to set up the canvas
resizeCanvas();

const particlesArr =[];
let heu = 0;


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
        this.size = Math.random() *15 +1;
        this.speedX = Math.random() * - 1.5;
        this.speedY = Math.random() * - 1.5;
    }
    update(){
        this.x +=this.speedX;
        this.y +=this.speedY;
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
        ctx.fillStyle = 'hsl('+ heu +',100%,50%)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size * 2, this.y + this.size / 2, this.x, this.y + this.size * 1.5);
        ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size / 2, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y + this.size / 4);
        ctx.closePath();
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
    draw();
    heu++
    requestAnimationFrame(animate)
}
animate()

