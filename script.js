const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);


const particlesArr = [];
let hue = 0;

let pointer = {
    x: null,
    y: null
};

//Created a new updatePointerPosition function that works for both mouse and touch events
function updatePointerPosition(event) {
    if (event.touches) {
        pointer.x = event.touches[0].clientX;
        pointer.y = event.touches[0].clientY;
    } else {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    }
    for (let i = 0; i < 10; i++) {
        particlesArr.push(new Particle());
    }
}

//Added event listeners for both mouse and touch events
canvas.addEventListener('mousemove', updatePointerPosition);
canvas.addEventListener('touchmove', updatePointerPosition);

class Particle {
    constructor() {
        this.x = pointer.x;
        this.y = pointer.y;
        this.size = Math.random() * 15 + 1;
        //Slightly adjusted the particle speed to make it more suitable for both mouse and touch input
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'hsl(' + hue + ',100%,50%)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size / 4);
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y - this.size / 2,
            this.x + this.size * 2, this.y + this.size / 2,
            this.x, this.y + this.size * 1.5
        );
        ctx.bezierCurveTo(
            this.x - this.size * 2, this.y + this.size / 2,
            this.x - this.size / 2, this.y - this.size / 2,
            this.x, this.y + this.size / 4
        );
        ctx.closePath();
        ctx.fill();
    }
}

function drawParticles() {
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].draw();
        particlesArr[i].update();
        if (particlesArr[i].size <= 0.3) {
            particlesArr.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles();
    hue++;
    requestAnimationFrame(animate);
}

animate();

// Added event listeners to prevent default touch behavior, which can cause scrolling issues on mobile device
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
});

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
