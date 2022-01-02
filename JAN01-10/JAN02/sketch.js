/*
Genuary 2022
JAN.2 "Dithering."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500, WEBGL);
  noLoop();
  noStroke();
}

function draw() {
  background(255);
  translate(-width/2, -height/2);

  let margin = 50;
  s = (width-2*margin)/4;
  pixel = s/16;
  let colors = [255, "#0077e1", "#f5d216", "#fc3503"];
  shuffle(colors, true);
  let squares = [];
  for (let k = 0; k < colors.length; k++) {
    for (let x = margin - s*k/colors.length; x < width-margin; x += s) {
      for (let y = margin - s*k/colors.length; y < height-margin; y += s) {
        let p = floor(random(8));
        let squ = {
          x: x,
          y: y,
          pat: floor(random(6)),
          col: colors[k]
        };
        squares.push(squ);
      }
    }
  }

  shuffle(squares, true);
  for (let squ of squares) {
    fill(squ.col);
    drawSquare(squ.x, squ.y, squ.pat);
  }

  fill(255);
  rect(0, 0, width, margin);
  rect(0, 0, margin, height);
  rect(0, height-margin, width, margin);
  rect(width-margin, 0, margin, height);
}

function drawSquare(x0, y0, pattern) {
  let i = 0;
  for (let x = x0; x < x0+s; x += pixel) {
    let j = 0;
    for (let y = y0; y < y0+s; y += pixel) {
      let b;
      if (pattern == 0) b = (i % 2 == 0) && (j % 2 == 0);
      else if (pattern == 1) b = (i + j) % 2 == 0;
      else if (pattern == 2) b = (i % 2 != 1) || (j % 2 != 1);
      else if (pattern == 3) b = (i % 2 == 0);
      else if (pattern == 4) b = (j % 2 == 0);
      else b = ((i % 2 == 0) && (j % 2 == 0)) || ((i % 4 == 1) && (j % 4 == 3)) || ((i % 4 == 3) && (j % 4 == 1));
      if (b) square(x, y, pixel);
      j++;
    }
    i++;
  }
}
