/*
Genuary 2022
JAN.28 "Self portrait."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  noLoop();
}

function draw() {
  background(0);

  let minCode = 128512, maxCode = 128580, codePoint;
  for (let i = 0; i < 2000; i++) {
    do {
      codePoint = floor(random(minCode, maxCode+1));
    } while ((codePoint > 128567 && codePoint < 128577) || (codePoint == 128520))
    let str = String.fromCodePoint(codePoint);
    let r = 125*sqrt(random());
    let theta = random(TAU);
    let x = width/2+r*cos(theta), y = height/2+r*sin(theta);
    push();
    translate(x, y);
    rotate(random(TAU));
    text(str, 0, 0);
    pop();
  }
}
