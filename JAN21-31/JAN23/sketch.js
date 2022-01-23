/*
Genuary 2022
JAN.23 "Abstract vegetation."

By Roni Kaufman
https://ronikaufman.github.io
*/

let margin = 50;
let y0 = 0;

function setup() {
  createCanvas(500, 500);
  //noLoop();
  noStroke();
  background(255);
}

function draw() {
  for (let i = 0; i < 24; i++) {
    let x0 = random(width);
    let vel0 = p5.Vector.fromAngle(3*PI/2 + random(-1, 1)*PI/6, 2.5);
    let p = new Particle(x0, y0, vel0, 3, [0, random(150, 245), 0]);
    while (p.stillGrowing()) {
      p.update();
      p.draw();
    }
  }

  if (random() < 0.01 && y0 > margin + 75 && y0 < height - margin - 75) {
    drawRock(random(margin+75, width-margin-75), y0);
  }

  y0++;
  if (y0 > height) {
    noLoop();
    fill(255);
    rect(0, 0, width, margin);
    rect(0, 0, margin, height);
    rect(0, height-margin, width, margin);
    rect(width-margin, 0, margin, height);
  }
}

function Particle(x0, y0, vel0, d0, col) {
  this.pos = createVector(x0, y0);
  this.vel = vel0;
  this.acc = createVector(0, 0.1);
  this.d = d0;
  this.col = col;

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.d -= 0.1;
  }

  this.draw = function() {
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.d);
  }

  this.stillGrowing = function() {
    return this.d > 0;
  }
}

function drawRock(x0, y0) {
  let thetaStep = PI/floor(random(6, 10));
  let rw0 = random(50, 100);
  let rh0 = random(50, 100);
  fill(random(245, 255));
  beginShape();
  for (let theta = PI; theta < TAU+thetaStep; theta += thetaStep) {
    let rw = rw0 + random(-5, 5);
    let x = x0 + rw*cos(theta);
    let rh = rh0 + random(-5, 5);
    let y = y0 + rh*sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}
