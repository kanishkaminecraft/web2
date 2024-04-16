var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.right === "-250px") {
      menu.style.right = "0";
    } else {
      menu.style.right = "-250px";
    }
  }
// Set initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas size when window size changes
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var particles = [];
var numParticles = 100;
var mouse = { x: 0, y: 0 };

for (var i = 0; i < numParticles; i++) {
    particles.push(new createParticle());
}

function createParticle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;

    this.radius = Math.random() * 2 + 1;
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y > canvas.height + 50) p.y = -50;

        for (var j = i + 1; j < particles.length; j++) {
            var p2 = particles[j];
            var distanceX = p.x - p2.x;
            var distanceY = p.y - p2.y;
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 0.1;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            var distanceMouseX = p.x - mouse.x;
            var distanceMouseY = p.y - mouse.y;
            var distanceMouse = Math.sqrt(distanceMouseX * distanceMouseX + distanceMouseY * distanceMouseY);

            if (distanceMouse < 60) {
                ctx.beginPath();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 0.1;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    drawParticles();
    requestAnimationFrame(animateParticles);
}

canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY
}, false);

animateParticles();
