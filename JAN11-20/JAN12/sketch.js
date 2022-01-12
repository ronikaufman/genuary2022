/*
Genuary 2022
JAN.12 "Packing (squares, circles, any shape…)"

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
  translate(width/2, height/2);
  rotate(PI/4);

  let margin = 50;
  let colors = ["#07224f", "#ed361a", "#fc8405", "#f7c72a"];
  shuffle(colors, true);

  let i = 0;
  let r = sqrt(sq(width - 2*margin)/2);
  let n = 4;
  while (r > 10) {
    fill(colors[i%colors.length]);
    beginShape();
    for (let theta = 0; theta < TAU; theta += TAU/n) {
      vertex(r*cos(theta), r*sin(theta));
    }
    endShape(CLOSE);

    i++;
    r *= cos(PI/n);
    r -= 5;
    n = random([3, 4, 5, 6, 7, 8]);
    rotate(random(TAU));
  }
}
