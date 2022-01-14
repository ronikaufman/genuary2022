/*
Genuary 2022
JAN.14 "Something you’d never make."

By Roni Kaufman
https://ronikaufman.github.io

Based on this article: https://palmdrop.github.io/post/domain-warping/
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  noStroke();
}

function draw() {
  background(255);
  let margin = 50;

  let rOff = random(TAU), gOff = random(TAU), bOff = random(TAU);
  let density = random(10, 20);
  for (let x = margin; x < width - margin; x += 0.5) {
    for (let y = margin; y < height - margin; y += 0.5) {
      let p = domainWarp(x, y, f1, f2);
      let r = colorVal(p, density, rOff);
      p = domainWarp(p[0], p[1], f1, f2);
      let g = colorVal(p, density+1, gOff);
      p = domainWarp(p[0], p[1], f1, f2);
      let b = colorVal(p, density+2, bOff);
      fill(r*255, g*255, b*255);
      square(x, y, 0.5);
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

function colorVal(p, density, offset) {
  let d = dist(p[0], p[1], width/2, height/2);
  return (sin(d/density + offset) + 1)/2;
}

function f1(x, y) {
  return noise(x/20, y/20);
}

function f2(x, y) {
  return noise(x/100, y/100);
}
