/*
Genuary 2022
JAN.8 "Single curve only."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  noFill();
}

function draw() {
  background(255);
  translate(width/2, height/2);
  rotate(random([0, PI/2]));
  translate(-width/2, -height/2);

  let lines = shuffle(random([
    [1, 2, 2, 2, 3],
    [1, 1, 2, 3, 3],
    [2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 2]
  ]));

  let margin = 50;
  let sw = 10;
  strokeWeight(sw);
  let s = (width - 2*margin - sw)/24;
  let y = margin + sw/2;
  let j = random([0, 1]);
  for (let i = 0; i < lines.length; i++) {
    let d = lines[i]*s*2;
    if (i % 2 == j) {
      line(margin + sw/2, y - s*(j ==1), margin + sw/2, y + d/2);
      line(width - margin - sw/2, y + d/2, width - margin - sw/2, y + d + s*(j == 1));
    } else {
      line(margin + sw/2, y + d/2, margin + sw/2, y + d + s*(j == 0));
      line(width - margin - sw/2, y - s*(j == 0), width - margin - sw/2, y + d/2);
    }
    y += d/2;
    let theta0 = PI * ((i % 2) + (j % 2));
    for (let x = margin + d/2 + sw/2; x < width - margin; x += d) {
      arc(x, y, d, d, theta0, theta0 + PI);
      theta0 += PI;
    }
    y += d/2 + s;
  }
}
