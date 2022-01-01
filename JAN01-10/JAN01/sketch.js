/*
Genuary 2022
JAN.1 "Draw 10,000 of something."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  noStroke();
}

function draw() {
  background(255);

  let margin = 50;
  let s = (width-2*margin)/100;
  let a1 = random(20, 50), b1 = floor(random(1, 6))*random([-1, 1]), c1 = random(TAU);
  let a2 = random(20, 50), b2 = floor(random(1, 6))*random([-1, 1]), c2 = random(TAU);
  let a3 = random(20, 50), b3 = floor(random(1, 6))*random([-1, 1]), c3 = random(TAU);
  for (let x = margin; x < width-margin; x += s) {
    for (let y = margin; y < height-margin; y += s) {
      let d = dist(x+s/2, y+s/2, width/2, height/2);
      let theta = atan2(y+s/2-height/2,x+s/2-width/2);
      let r = spiral(d, theta, a1, b1, c1);
      let g = spiral(d, theta, a2, b2, c2);
      let b = spiral(d, theta, a3, b3, c3);
      fill(r, g, b)
      square(x, y, s);
    }
  }
}

function spiral(d, theta, a, b, c) {
  return map(sin(theta*b + d/a + c), -1, 1, 0, 255)*(d<50?sqrt(d/50):1);
}
