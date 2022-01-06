/*
Genuary 2022
JAN.6 "Trade styles with a friend."

By Roni Kaufman
https://ronikaufman.github.io

Inspired by Bent (https://www.artblocks.io/project/214)
*/

let colors = ["#ffcc4d", "#f5b800", "#56a1c4", "#4464a1", "#ee726b", "#df5f50"];

function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
  noLoop();
  shuffle(colors, true);
}

function draw() {
  translate(-width/2, -height/2);
  background(255);
  let margin = 50;

  let n = 6;
  let s = 100/sqrt(3);
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      if (abs(j) < 3) {
        let x1 = width/2+(i*sqrt(3) + j*sqrt(3)/2)*s;
        let y1 = height/2+(j*3/2)*s;
        let id = 0;
        for (let theta = PI/6; theta < TAU; theta += PI/3) {
          let x2 = x1 + s*cos(theta), y2 = y1 + s*sin(theta);
          let x3 = x1 + s*cos(theta+PI/3), y3 = y1 + s*sin(theta+PI/3);
          makeTriangle(x1, y1, x2, y2, x3, y3, (id++)%3);
        }
      }
    }
  }

  fill(255);
  rect(0, 0, margin, height);
  rect(width-margin, 0, margin, height);
}

function makeTriangle(x1, y1, x2, y2, x3, y3, id) {
  let x0 = (x1+x2+x3)/3, y0 = (y1+y2+y3)/3;

  push();
  translate(x0, y0);
  let rot = floor(random(3));
  rotate(rot*TAU/3);

  fill("#001a5b");
  makeQuad(x0, y0, x1, y1, x2, y2, x3, y3, id, 1/5);

  fill(colors[rot]);
  makeQuad(x0, y0, x1, y1, x2, y2, x3, y3, id, 1/3);

  pop();
}

function makeQuad(x0, y0, x1, y1, x2, y2, x3, y3, id, p) {
  let xA, yA, xB, yB, xC, yC, xD, yD;
  if (id == 0) {
    [xA, yA] = lerp2D(x1, y1, x2, y2, p);
    [xB, yB] = lerp2D(x2, y2, x1, y1, p);
    [xC, yC] = lerp2D(x2, y2, x3, y3, p);
    [xD, yD] = lerp2D(x3, y3, x2, y2, p);
  } else if (id == 1) {
    [xA, yA] = lerp2D(x3, y3, x1, y1, p);
    [xB, yB] = lerp2D(x1, y1, x3, y3, p);
    [xC, yC] = lerp2D(x2, y2, x3, y3, p);
    [xD, yD] = lerp2D(x3, y3, x2, y2, p);
  } else {
    [xA, yA] = lerp2D(x1, y1, x2, y2, p);
    [xB, yB] = lerp2D(x2, y2, x1, y1, p);
    [xC, yC] = lerp2D(x3, y3, x1, y1, p);
    [xD, yD] = lerp2D(x1, y1, x3, y3, p);
  }
  quad(xA - x0, yA - y0, xB - x0, yB - y0, xC - x0, yC - y0, xD - x0, yD - y0);
}

function lerp2D(x1, y1, x2, y2, t) {
  let x3 = (1-t)*x1 + t*x2;
  let y3 = (1-t)*y1 + t*y2;
  return [x3, y3];
}
