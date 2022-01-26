/*
Genuary 2022
JAN.26 "Airport carpet."

By Roni Kaufman
https://ronikaufman.github.io
*/

let margin = 50, pattern;

function setup() {
  createCanvas(500, 500);

  pattern = createPattern();
  background(255);
  noStroke();
}

function draw() {
  let maxNoise = 25;

  for (let i = 0; i < 1000; i++) {
    let x = random(width - 2*margin), y = random(height - 2*margin);
    let c = pattern.get(x, y);
    let r = red(c), g = green(c), b = blue(c);
    let no = random(-1, 1)*maxNoise;
    fill(
      r + no,
      g + no,
      b + no
    );
    circle(x+margin, y+margin, random(2, 3.5));
  }
}

function createPattern() {
  let palette = ["#ffe140", "#ffa922", "#1bc0c6", "#2484ae", "#134e6e"];
  let pg = createGraphics(width - 2*margin, height - 2*margin);
  let n = 20;
  let s = pg.width/n;

  pg.background(palette.splice(floor(random(palette.length)), 1)[0]);
  pg.noStroke();

  let bands = [];

  let y = 0;
  while (y < pg.height) {
    let h = 2*floor(random(1, 3))*s;
    bands.push({
      z: y,
      size: h,
      orientation: "horizontal"
    });
    y += h;
  }

  let x = 0;
  while (x < pg.width) {
    let w = 2*floor(random(1, 3))*s;
    bands.push({
      z: x,
      size: w,
      orientation: "vertical"
    });
    x += w;
  }

  shuffle(bands, true);
  for (let b of bands) {
    pg.fill(random(palette));
    if (b.orientation == "horizontal") {
      makeHorizontalBand(b.z, b.size, s, pg);
    } else {
      makeVerticalBand(b.z, b.size, s, pg);
    }
  }

  return pg;
}

function makeHorizontalBand(y0, h, s, pg) {
  let type = random([0, 1]);
  if (type == 0) {
    for (let y = y0; y < y0 + h; y += s) {
      pg.rect(0, y, pg.width, s/2);
    }
  } else {
    for (let x = 0; x < pg.width; x += s) {
      pg.rect(x, y0, s/2, h);
    }
  }
}

function makeVerticalBand(x0, w, s, pg) {
  let type = random([0, 1]);
  if (type == 0) {
    for (let x = x0; x < x0 + w; x += s) {
      pg.rect(x+s/2, 0, s/2, pg.height);
    }
  } else {
    for (let y = 0; y < pg.height; y += s) {
      pg.rect(x0, y+s/2, w, s/2);
    }
  }
}
