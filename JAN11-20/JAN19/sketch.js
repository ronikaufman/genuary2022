/*
Genuary 2022
JAN.19 "Use text/typography."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  noFill();
  strokeCap(PROJECT);
  strokeWeight(2);
}

function draw() {
  background(255);
  let margin = 50;

  fill(random(["#5b89e5", "#e5d416", "#d8392b", "#3dcc4b"]));
  noStroke();
  square(margin, margin, width-2*margin);
  stroke(random([255, 0]));

  let s = (width - 2*margin)/4;
  let a = HALF_PI/8;
  let letters = ["T", "R", "U", "C", "H", "E", "T"];

  for (let x = margin; x < width - margin; x += s) {
    for (let y = margin; y < height - margin; y += s) {
      if (random() < 1/2) {
        for (let i = 1; i < 8; i++) {
          makeLetter(x, y, s/2, i*a, letters[i-1]);
          makeLetter(x+s, y+s, s/2, i*a+PI, letters[i-1]);
        }
      } else {
        for (let i = 1; i < 8; i++) {
          makeLetter(x+s, y, s/2, i*a+PI/2, letters[i-1]);
          makeLetter(x, y+s, s/2, i*a+3*PI/2, letters[i-1]);
        }
      }
    }
  }
}

function makeLetter(x, y, r, theta, letter) {
  push();
  translate(x+r*cos(theta), y+r*sin(theta));
  rotate(theta+PI/2);

  let u = r/15;
  switch (letter) {
    case "T":
      line(-u, -u, u, -u);
      line(0, -u, 0, u);
      break;
    case "R":
      line(-u, -u, -u, u);
      line(-u, -u, u/2, -u);
      line(-u, 0, u/2, 0);
      line(0, 0, u, u);
      arc(u/2, -u/2, u, u, -PI/2, PI/2);
      break;
    case "U":
      line(-u, -u, -u, 0);
      line(u, -u, u, 0);
      arc(0, 0, u*2, u*2, 0, PI);
      break;
    case "C":
      line(0, -u, u, -u);
      line(0, u, u, u);
      arc(0, 0, u*2, u*2, PI/2, 3*PI/2);
      break;
    case "H":
      line(-u, -u, -u, u);
      line(u, -u, u, u);
      line(-u, 0, u, 0);
      break;
    case "E":
      line(-u, -u, -u, u);
      line(-u, -u, u, -u);
      line(-u, 0, 0, 0);
      line(-u, u, u, u);
      break;
  }

  pop();
}
