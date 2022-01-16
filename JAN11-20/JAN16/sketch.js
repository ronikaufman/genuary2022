/*
Genuary 2022
JAN.16 "Color gradients gone wrong."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  background(255);

  let margin = 50;
  let s = (width - 2*margin)/random([4, 6, 8, 10]);
  let col1 = 255, col2 = "#001a5b";

  for (let x = margin; x < width-margin; x += s) {
    for (let y = margin; y < height-margin; y += s) {
      if (random() < 1/2) [col1, col2] = [col2, col1];
      let vertical = random() < 1/2;
      for (let z = 0; z < s; z += 0.5) {
        let v = 1-cos(PI*z/s);
        stroke(lerpColor(color(col1), color(col2), v/2));
        if (vertical) line(x, y+z, x+s, y+z);
        else line(x+z, y, x+z, y+s);
      }
    }
  }
}
