/*
Genuary 2022
JAN.20 "Make a sea of shapes."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  let margin = 50;

  let shapes = createGraphics(width - 2*margin, height - 2*margin);
  let a = 255, b = 0;
  if (random() < 1/2) [a, b] = [b, a];
  shapes.background(a);
  shapes.fill(b);
  shapes.noStroke();
  let n = random([2, 3, 4]) + 0.5;
  let s = shapes.width/n;
  let r = s*0.45;
  for (let x = s*3/4; x < shapes.width; x += s) {
    for (let y = s*3/4; y < shapes.height; y += s) {
      let nSides = random([3, 4, 5, 6]);
      let theta0 = random(TAU);
      shapes.beginShape();
      for (let theta = 0; theta < TAU; theta += TAU/nSides) {
        shapes.vertex(x + r*cos(theta + theta0), y + r*sin(theta + theta0));
      }
      shapes.endShape(CLOSE);
    }
  }
  shapes.filter(BLUR, 5);

  background(255);
  colorMode(HSB);
  noStroke();
  let interLines = (height - 2*margin)/64;
  for (let y = margin; y < height - margin; y += interLines) {
    fill(map(y, margin, height-margin, 200, 215), 100, 100);
    for (let x = margin; x < width - margin; x += 0.5) {
      let mag = shapes.get(x-margin, y-margin)[0]/255;
      let offset = sin(x/4)*interLines/2;
      circle(x, y+offset, 1.5+2*mag);
    }
  }
}
