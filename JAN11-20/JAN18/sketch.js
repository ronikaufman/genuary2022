/*
Genuary 2022
JAN.18 "VHS."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  strokeWeight(1.5);
}

function draw() {
  let margin = 50;
  let s = (width - 2*margin)/15;
  let rainbow = ["#d8d800", "#00d8d8", "#00d800", "#d800d8", "#d80000", "#0000d8"];
  let grayscale = [0, 51, 102, 153, 204, 255];

  background(255);
  fill(62);
  noStroke();
  square(margin, margin, width - 2*margin);

  stroke(255);
  for (let z = margin + s/2; z < width - margin; z += s) {
    line(z, margin, z, height-margin);
    line(margin, z, width-margin, z);
  }

  let y = margin + 2.5*s;
  noStroke();
  while (y < height - margin - 2.5*s) {
    let ys = s*random([0.5, 1, 1.5]);
    if (y+ys > height - margin - 2.5*s) ys = height - margin - 2.5*s - y;
    let xs = s*random([1/4, 1/2, 1, 2, 4, 6]);
    let i = 0;
    let colors = random([rainbow, grayscale, grayscale]);
    if (random() < 1/2) colors.reverse();
    if (random() < 1/3) shuffle(colors, true);
    if (random() < 1/4) colors = [random(colors), random(colors)];
    for (let x = margin + 1.5*s; x < width - margin - 1.5*s - 0.1; x += xs) {
      fill(colors[i%colors.length]);
      rect(x, y, xs, ys);
      i++;
    }
    y += ys;
  }

  stroke(255);
  noFill();
  rect(margin + 1.5*s, margin + 2.5*s, width - 2*margin - 3*s, height - 2*margin - 5*s);
  circle(width/2, height/2, 360);

  let offRed = random([0, 16]);
  let offGreen = random([0, 16]);
  let offBlue = random([0, 16]);
  loadPixels();
  let d = pixelDensity();
  let halfImage = 4 * (width * d) * (height * d);
  for (let i = 0; i < halfImage; i += 4) {
    pixels[i] = pixels[i+offRed];
    pixels[i + 1] = pixels[i+1+offGreen];
    pixels[i + 2] = pixels[i+2+offBlue];
  }
  updatePixels();
}
