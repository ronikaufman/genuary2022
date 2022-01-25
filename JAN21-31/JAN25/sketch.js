/*
Genuary 2022
JAN.25 "Perspective."

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

  let pg = createGraphics(width, height);
  pg.strokeCap(SQUARE);
  pg.strokeWeight(2);

  let s = pg.width / 24;
  let palette = random([
    ["#07224f", "#ed361a", "#fc8405", "#f7c72a", "#ffffff"],
    ["#218ad4", "#76df55", "#0b1435", "#ffffff"],
    ["#dc060e", "#ffd400", "#0064b0", "#001a5b", "#ffffff"],
    ["#2d2de5", "#ffffff", "#9696a0", "#1e1e28"]
  ]);

  for (let x = 0; x < pg.width; x += s) {
    for (let y = 0; y < pg.height; y += s) {
      shuffle(palette, true);
      pg.fill(palette[0]);
      pg.square(x, y, s);
      pg.fill(palette[1]);
      if (random() < 4/5) makeTileA(x, y, s, pg);
      pg.stroke(palette[2]);
      if (random() < 3/5) makeTileB(x, y, s, pg);
      pg.noStroke();
      pg.fill(palette[3]);
      if (random() < 2/5) makeTileA(x, y, s, pg);
    }
  }

  let pg2 = createGraphics(width-2*margin, height-2*margin, WEBGL);
  pg2.texture(pg);
  pg2.translate(width/2-20, height/2-105, 0);
  pg2.rotateX(random(0.4, 0.5));
  pg2.rotateZ(random([-0.04, 0.04]));
  pg2.noStroke();
  pg2.plane(1200);

  image(pg2, margin, margin);
}

function makeTileA(x, y, s, pg) {
  pg.push();
  pg.translate(x+s/2, y+s/2);
  pg.rotate(random([0, PI/2, PI, 3*PI/2]));
  let r = random(3);
  if (r < 1) {
    pg.circle(0, 0, 2*s/3);
  } else if (r < 2) {
    pg.square(-s/2, -s/2, s/2);
    pg.square(0, 0, s/2);
  } else if (r < 3) {
    pg.rect(-s/2, -s/2, s, s/2);
  }
  pg.pop();
}

function makeTileB(x, y, s, pg) {
  pg.push();
  pg.translate(x+s/2, y+s/2);
  pg.rotate(random([0, PI/2, PI, 3*PI/2]));
  let n = 6;
  for (let z = 1-s/2; z < s/2; z += (s-2)/n) {
    pg.line(z, -s/2, z, s/2);
  }
  pg.pop();
}
