/*
Genuary 2022
JAN.15 "Sand."

By Roni Kaufman
https://ronikaufman.github.io
*/

let margin = 50, n = 64;
let world = [];
let palette = ["#f2eb8a", "#fed000", "#fc8405", "#ed361a", "#e2f0f3", "#b3dce0", "#4464a1", "#203051", "#ffc5c7", "#f398c3", "#cf3895", "#6d358a", "#06b4b0", "#4b8a5f"];
let col = 0;

function setup() {
  createCanvas(500, 500);
  background(255);
  noStroke();

  for (let i = 0; i < n; i++) {
    let line = [];
    for (let j = 0; j < n; j++) {
      line.push(255);
    }
    world.push(line);
  }

  shuffle(palette, true);
}

function draw() {
  oneStep();
  drawWorld();

  let x = width/2 + (noise(frameCount/150)-0.5)*(width-2*margin)*1.1;
  if (frameCount < 3000) addGrain(x, margin);
  if (frameCount % 80 == 0) col++;
}

function oneStep() {
  for (let i = n-2; i > -1; i--) {
    for (let j = 0; j < n; j++) {
      let v = world[i][j];
      if (v != 255) {
        if (world[i+1][j] == 255) {
          world[i][j] = 255;
          world[i+1][j] = v;
        } else if (j > 0 && world[i+1][j-1] == 255) {
          world[i][j] = 255;
          world[i+1][j-1] = v;
        } else if (j < n-1 && world[i+1][j+1] == 255) {
          world[i][j] = 255;
          world[i+1][j+1] = v;
        }
      }
    }
  }
}

function drawWorld() {
  let s = (width - 2*margin)/n;
  for (let i = 0; i < n; i++) {
    let y = margin + i*s;
    for (let j = 0; j < n; j++) {
      let x = margin + j*s;
      fill(world[i][j]);
      square(x, y, s);
    }
  }
}

function addGrain(x, y) {
  if (x > margin || y > margin || x < width-margin || y < height-margin) {
    let i = floor(n * (y - margin)/(height - 2*margin));
    let j = floor(n * (x - margin)/(width - 2*margin));
    world[i][j] = palette[col%palette.length];
  }
}
