/*
Genuary 2022
JAN.21 "Combine two (or more) of your pieces from previous days to make a new piece."

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

  let a1 = random(20, 50), b1 = floor(random(1, 6))*random([-1, 1]), c1 = random(TAU);
  let a2 = random(20, 50), b2 = floor(random(1, 6))*random([-1, 1]), c2 = random(TAU);
  let a3 = random(20, 50), b3 = floor(random(1, 6))*random([-1, 1]), c3 = random(TAU);
  for (let x = margin; x < width - margin; x += 1) {
    for (let y = margin; y < height - margin; y += 1) {
      let p = domainWarp(x, y, f1, f2);
      let r = colorVal(p, a1, b1, c1);
      p = domainWarp(p[0], p[1], f1, f2);
      let g = colorVal(p, a2, b2, c2);
      p = domainWarp(p[0], p[1], f1, f2);
      let b = colorVal(p, a3, b3, c3);
      fill(r, g, b);
      square(x, y, 1);
    }
  }
}

function domainWarp(x, y, angleFunction, distFuntion) {
  let theta = angleFunction(x, y) * TAU;
  let r = distFuntion(x, y) * 10;

  let xOff = r*cos(theta);
  let yOff = r*sin(theta);

  return [x + xOff, y + yOff];
}

function colorVal(p, a, b, c) {
  let d = dist(p[0], p[1], width/2, height/2);
  let theta = atan2(p[1] - height/2, p[0] - width/2);
  return map(sin(theta*b + d/a + c), -1, 1, 0, 255) * (d < 50 ? sqrt(d/50) : 1);
}

function f1(x, y) {
  return noise(x/20, y/20);
}

function f2(x, y) {
  return noise(x/100, y/100);
}
