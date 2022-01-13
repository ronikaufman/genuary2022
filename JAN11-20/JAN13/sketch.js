/*
Genuary 2022
JAN.13 "800x80."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  strokeWeight(5);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  rotate(random([0, PI]));
  translate(-width/2, -height/2);

  let colors = random([
    ["#228fca", "#dcedf0", "#021d34"],
    ["#3cd86b", "#ebf7cd", "#0d150b"],
    ["#ffd919", "#fffbe6", "#262104"]
  ]);

  let margin = 50;
  let s = (width - 2*margin)/10;
  let i = 0;
  let hue = random(100);
  for (let y = margin; y < height - margin; y += s) {
    noStroke();
    fill(colors[i++%2]);
    rect(margin, y, width - 2*margin, s);

    stroke(colors[2]);
    noFill();
    let id = random([0, 1, 2]);
    let rot = random([0, PI/2, PI, 3*PI/2]);
    for (let x = margin; x < width - margin; x += s) {
      push();
      translate(x+s/2, y+s/2);
      rotate(rot);
      translate(-s/2, -s/2);

      if (id == 0) {
        arc(0, 0, s/2, s/2, 0, PI/2);
        arc(0, 0, s, s, 0, PI/2);
        arc(s, s, s/2, s/2, PI, 3*PI/2);
        arc(s, s, s, s, PI, 3*PI/2);
        arc(0, s, s/2, s/2, 3*PI/2, TAU);
        arc(s, 0, s/2, s/2, PI/2, PI);
      } else if (id == 1) {
        arc(0, 0, s/2, s/2, 0, PI/2);
        arc(0, 0, s, s, 0, PI/2);
        arc(0, 0, 3*s/2, 3*s/2, 0, PI/2);
        arc(s, s, s/2, s/2, PI, 3*PI/2);
        arc(3*s/8, s, s/4, s/4, PI, TAU);
        arc(s, 3*s/8, s/4, s/4, PI/2, 3*PI/2);
      } else {
        arc(0, 0, s/2, s/2, 0, PI/2);
        arc(s, s, s/2, s/2, PI, 3*PI/2);
        arc(0, s, s/2, s/2, 3*PI/2, TAU);
        arc(s, 0, s/2, s/2, PI/2, PI);
        line(s/2, 0, s/2, s);
        line(0, s/2, s, s/2);
      }

      pop();
    }
  }
}
