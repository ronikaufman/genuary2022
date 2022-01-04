/*
Genuary 2022
JAN.4 "The next next Fidenza."

By Roni Kaufman
https://ronikaufman.github.io
*/

let gap = 15;
let margin = 50;
let squiggles = [];

function setup() {
  createCanvas(500, 500);
  //noLoop();
  noStroke();
  colorMode(HSB, 100);
  background(255);
}

function draw() {
  let noAddition = true;
  for (let i = 0; i < 100; i++) {
    if (makeSquiggle()) {
      noAddition = false;
    }
  }
  if (noAddition) noLoop();
}

function makeSquiggle() {
  let squi = new Squiggle(random(margin, width-margin), random(margin, height-margin));
  while (squi.move());
  if (squi.circles.length > 10) {
    squiggles.push(squi);
    squi.draw();
    return true;
  }
  return false;
}

function Squiggle(x0, y0) {
  this.x = x0;
  this.y = y0;
  this.startCol = random(100);
  this.colStep = random(0.5, 1) * random([-1, 1]);
  this.circles = [createVector(x0, y0)];
  this.d = 10;

  this.move = function() {
    let theta = noise(this.x / 500, this.y / 500)*2*TAU;
    //theta = atan2(this.y-height/3, this.x-width/2)+PI/3;
    //theta = (sin(this.x/8) + (noise(this.x / 100)-0.5)*2) * map(noise(this.x / 10), 0, 1, PI/4, PI/3);
    let r = 1;
    this.x += r * cos(theta);
    this.y += r * sin(theta);
    if (this.x < margin || this.x > width-margin || this.y < margin || this.y > height-margin) {
      return false;
    }
    let circ = createVector(this.x, this.y);
    for (let squi of squiggles) {
      for (let c of squi.circles) {
        if (circ.dist(c) < gap) return false;
      }
    }
    this.circles.push(circ);
    return true;
  }

  this.draw = function() {
    let n = this.circles.length;
    for (let i = 0; i < n; i++) {
      fill(this.startCol%100, 100, 100);
      this.startCol += this.colStep;
      if (this.startCol < 0) this.startCol += 100;
      let c = this.circles[i];
      circle(c.x, c.y, this.d);
    }
  }
}
