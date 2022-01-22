/*
Genuary 2022
JAN.22 "Combine two (or more) of your pieces from previous days to make a new piece."

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
  let gap = 10;
  let n = random([3, 4, 5]);
  let s = (width - 2*margin - gap)/n;

  let color;
  if (year() % 2 == 0) {
    color = "#0077e1";
  } else {
    color = "#fc3503";
  }

  fill(color);
  let tl0 = random([0, s/2]);
  let tr0 = random([0, s/2]);
  let br0 = random([0, s/2]);
  let bl0 = random([0, s/2]);
  square(margin, margin, width - 2*margin, tl0, tr0, br0, bl0);

  fill(255);
  for (let x = margin + gap/2; x < width - margin - gap/2; x += s) {
    for (let y = margin + gap/2; y < height - margin - gap/2; y += s) {
      let tl1 = (x == margin + gap/2 && y == margin + gap/2) ? tl0 : random([0, s/2]);
      let tr1 = (x == width - margin - gap/2 - s && y == margin + gap/2) ? tr0 : random([0, s/2]);
      let br1 = (x == width - margin - gap/2 - s && y == height - margin - gap/2 - s) ? br0 : random([0, s/2]);
      let bl1 = (x == margin + gap/2 && y == height - margin - gap/2 - s) ? bl0 : random([0, s/2]);
      square(x+gap/2, y+gap/2, s-gap, tl1, tr1, br1, bl1);
    }
  }
}
