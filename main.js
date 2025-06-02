// Kar tanesi animasyonu
const snowCanvas = document.getElementById('snow-canvas');
const ctx = snowCanvas.getContext('2d');
let snowflakes = [];

// Mouse için ek: Yakınındaki kar taneleri uçuşsun
let mouse = { x: -1000, y: -1000, radius: 150 };

snowCanvas.addEventListener('mousemove', function(e) {
  const rect = snowCanvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
snowCanvas.addEventListener('mouseleave', function() {
  mouse.x = -1000;
  mouse.y = -1000;
});

function resizeCanvas() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createSnowflakes() {
  const count = 80;
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      x: Math.random() * snowCanvas.width,
      y: Math.random() * snowCanvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() * 2 + 0.5
    });
  }
}
createSnowflakes();

function drawSnowflakes() {
  ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  for (let i = 0; i < snowflakes.length; i++) {
    const f = snowflakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveSnowflakes();
}

function moveSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    const f = snowflakes[i];

    // Mouse'a yakınsa uçuşsun
    let dx = f.x - mouse.x;
    let dy = f.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      // Kar tanesini mouse'dan uzağa it
      let angle = Math.atan2(dy, dx);
      let force = (mouse.radius - dist) / mouse.radius;
      let fx = Math.cos(angle) * force * 8;
      let fy = Math.sin(angle) * force * 8;
      f.x += fx;
      f.y += fy;
    }

    f.y += f.d;
    f.x += Math.sin(f.y * 0.01) * 0.5;
    if (f.y > snowCanvas.height) {
      f.y = -5;
      f.x = Math.random() * snowCanvas.width;
    }
  }
}

function animateSnow() {
  drawSnowflakes();
  requestAnimationFrame(animateSnow);
}
animateSnow();