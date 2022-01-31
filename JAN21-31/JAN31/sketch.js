/*
Genuary 2022
JAN.31 "Negative space."

By Roni Kaufman
https://ronikaufman.github.io
*/

let pattern;
let circles = [];
let palette = ["#0863d3", "#f5d216", "#f43809", "#08b233", "#9913bf"];

function setup() {
  createCanvas(500, 500);
  //noLoop();
  noStroke();

  let margin = 50;
  pattern = createGraphics(width, height);
  pattern.background(255);
  pattern.fill(0);
  sierpinski(pattern, margin, margin, width - 2*margin, 4);

  background(255);
}

function draw() {
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    let r = 1;
    let newCircle = {
      center: createVector(x, y),
      r: r
    }
    if (canAdd(newCircle)) {
      while (canAdd(newCircle)) {
        newCircle.r++;
      }
      fill(random(palette));
      circle(x, y, 2*newCircle.r - 1);
      circles.push(newCircle);
    }
  }
}

function sierpinski(pg, x, y, s, n) {
  if (n == 0) {
    pg.square(x, y, s);
    return;
  }
  sierpinski(pg, x, y, s/3, n-1);
  sierpinski(pg, x+s/3, y, s/3, n-1);
  sierpinski(pg, x+2*s/3, y, s/3, n-1);
  sierpinski(pg, x, y+s/3, s/3, n-1);
  sierpinski(pg, x+2*s/3, y+s/3, s/3, n-1);
  sierpinski(pg, x, y+2*s/3, s/3, n-1);
  sierpinski(pg, x+s/3, y+2*s/3, s/3, n-1);
  sierpinski(pg, x+2*s/3, y+2*s/3, s/3, n-1);
}

function canAdd(newCircle) {
  let x = newCircle.center.x;
  let y = newCircle.center.y;
  let r = newCircle.r;

  // check intersection with other circles
  for (let c of circles) {
    if (c.center.dist(newCircle.center) < c.r + r + 1) {
      return false;
    }
  }
  // check if it's inside the canvas
  if (x - r < 1 || x + r > width - 1 || y - r < 1 || y + r > height - 1) {
    return false;
  }
  // check if it's not too big
  if (r > 10) {
    return false;
  }
  // check the background pattern, the center and border of the new circle
  let c = pattern.get(x, y);
  if (c[0] == 0) {
    return false;
  }
  for (let theta = 0; theta < TAU; theta += TAU/12) {
    c = pattern.get(x + r*cos(theta), y + r*sin(theta));
    if (c[0] == 0) {
      return false;
    }
  }

  return true;
}
