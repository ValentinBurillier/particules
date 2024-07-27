const canvas = document.querySelector('canvas'); // Cree un canvas
const ctx = canvas.getContext('2d'); // Défini le contexte en 2D

canvas.width = window.innerWidth; // canvas largeur de l'écran
canvas.height = window.innerHeight; // canvas hauteur de l'écran

class Particle { // Création d'une particule 
  constructor(x,y,directionX,directionY,size,color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() { // Dessin de la particule
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color; // Remplissage
    ctx.fill();
  }
  update() {
    if(this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    else if(this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

const particle1 = new Particle(10,10,50,55,2,'#F1F1F1'); // Instance d'une particule



let particlesArray;

function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.height * canvas.width) / 6000; // Nombre de particules selon dimensions écran

  for(let i = 0; i < numberOfParticles; i++) {
    const size = (Math.random() * 2) + 1; //size [1;3[
    const x = Math.random() * ((innerWidth - 10) -10 + 1) + 10;
    const y = Math.random() * ((innerHeight - 10) -10 + 1) + 10;

    const directionX = cleanDirection();
    const directionY = cleanDirection();
    particlesArray.push(new Particle(x, y, directionX, directionY, size, "#F1F1F1"));
  }
}
init();

function cleanDirection() {
  const random = Math.trunc(Math.random() * 2) // 0 ou 1
  if(random) {
    return (Math.random() * 1) + 0.5; // [0.5;1.5[
  } else {
    return (Math.random() * -1) - 0.5; // [-0.5;-1.5[
  }
}

function animate() {
  ctx.clearRect(0,0,innerWidth, innerHeight);
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();

function connect() {
  for(let i = 0; i < particlesArray.length; i++) {
    for(let j = i + 1; j < particlesArray.length; j++) {
      const squareDistanceX = (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x);
      const squareDistanceY = (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y);

      const hypothenuse = squareDistanceX + squareDistanceY;
      if(hypothenuse < (135 * 135)) {
        ctx.strokeStyle = `rgba(240,240,240,${1 - hypothenuse/ (135*135)})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize', handleResize)

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}