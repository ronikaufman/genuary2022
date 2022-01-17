/*
Genuary 2022
JAN.17 "3 colors."

By Roni Kaufman
https://ronikaufman.github.io
*/

let margin = 50;
let colors = ["#dc060e", "#ffd400", "#0064b0", "#001a5b"];
let lines = [];
let gap = 5;

function setup() {
  createCanvas(500, 500);
  noStroke();
  background(255);

  colors.splice(floor(random(colors.length)), 1);
}

function draw() {
  let noAddition = true;
  for (let i = 0; i < 100; i++) {
    if (makeLine()) {
      noAddition = false;
    }
  }
  if (noAddition) noLoop();
}

function makeLine() {
  let li = new Line(random(margin, width-margin), random(margin, height-margin));
  while (li.move());
  if (li.circles.length > 6) {
    lines.push(li);
    li.draw();
    return true;
  }
  return false;
}

function Line(x0, y0) {
  this.x = x0;
  this.y = y0;
  this.col = random(colors);
  this.circles = [createVector(x0, y0)];
  this.d = 3;

  this.move = function() {
    let theta = atan2(this.y-height/2, this.x-width/2);
    let r = 1;
    this.x += r * cos(theta);
    this.y += r * sin(theta);
    if (this.x < margin || this.x > width-margin || this.y < margin || this.y > height-margin) {
      return false;
    }
    let circ = createVector(this.x, this.y);
    for (let li of lines) {
      for (let c of li.circles) {
        if (circ.dist(c) < gap) return false;
      }
    }
    this.circles.push(circ);
    if (this.circles.length > 9) return false;
    return true;
  }

  this.draw = function() {
    fill(this.col);
    for (let c of this.circles) {
      circle(c.x, c.y, this.d + random(-1, 1)*0.6);
    }
  }
}
