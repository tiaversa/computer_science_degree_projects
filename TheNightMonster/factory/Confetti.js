// Not my code, credit too: https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
let nouvelle,
  ancienne,
  pression;

let themeCouleur = [
  '#ECEE81','#8DDFCB','#82A0D8','#EDB7ED'
];
class Particule {
  constructor(parent) {
    this.parent = parent;
    this.gravite = parent.gravite;
    this.reinit();
    this.forme = round(random(0, 1));
    this.etape = 0;
    this.prise = 0;
    this.priseFacteur = random(-0.02, 0.02);
    this.multFacteur = random(0.01, 0.08);
    this.priseAngle = 0;
    this.priseVitesse = 0.05;
  }
  reinit() {

    this.position = this.parent.position.copy();
    this.position.y = random(-20, -100);
    this.position.x = random(0, width);
    this.velocite = createVector(random(-6, 6), random(-10, 2));
    this.friction = random(0.995, 0.98);
    this.taille = round(random(5, 15));
    this.moitie = this.taille / 2;
    this.couleur = color(random(themeCouleur));

  }
  dessiner() {

    this.etape = 0.5 + Math.sin(this.velocite.y * 20) * 0.5;

    this.prise = this.priseFacteur + Math.cos(this.priseAngle) * this.multFacteur;
    this.priseAngle += this.priseVitesse;
    translate(this.position.x, this.position.y);
    rotate(this.velocite.x * 2);
    scale(1, this.etape);
    noStroke();
    fill(this.couleur);

    if (this.forme === 0) {
      rect(-this.moitie, -this.moitie, this.taille, this.taille);
    } else {
      ellipse(0, 0, this.taille, this.taille);
    }

    resetMatrix();
  }
  integration() {
    this.velocite.add(this.gravite);
    this.velocite.x += this.prise;
    this.velocite.mult(this.friction);
    this.position.add(this.velocite);
    if (this.position.y > height) {
      this.reinit();
    }

    if (this.position.x < 0) {
      this.reinit();
    }
    if (this.position.x > width + 10) {
      this.reinit();
    }
  }
  rendu() {
    this.integration();
    this.dessiner();

  }
}
class SystemeDeParticules {
  constructor(nombreMax, position, gravite) {
    this.position = position.copy();
    this.nombreMax = nombreMax;
    this.gravite = createVector(0, 0.1);
    this.friction = 0.98;
    // le tableau 
    this.particules = [];
    for (let i = 0; i < this.nombreMax; i++) {
      this.particules.push(new Particule(this));
    }
  }
  rendu() {
    if (pression) {
      let force = p5.Vector.sub(nouvelle, ancienne);
      this.gravite.x = force.x / 20;
      this.gravite.y = force.y / 20;
    }

    this.particules.forEach(particules => particules.rendu());
  }
}
let confettis;

function setupConfetti() {
  createCanvas(width, height);
  frameRate(60);
  ancienne = createVector(0, 0);
  nouvelle = createVector(0, 0);
  confettis = new SystemeDeParticules(500, createVector(width / 2, -20));
}

function windowResized() {
  resizeCanvas(width, height);
  confettis.position = createVector(width / 2, -40);
}

function runConfetties()
{
	// background(color("#111"));
	nouvelle.x = mouseX;
	nouvelle.y = mouseY;
	confettis.rendu();
	ancienne.x = nouvelle.x;
	ancienne.y = nouvelle.y;
}