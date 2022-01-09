/*
Genuary 2022
JAN.9 "Architecture."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  strokeWeight(2);
  stroke("#0d150b");
  strokeJoin(BEVEL);
}

function draw() {
  background(255);
  translate(width/2, height/2);

  let s = 50;
  let t = s*sqrt(3)
  let n = 7;
	let mode = random([0, 1]); // which orientation for the hexagon
  let colors = shuffle(["#fef9c6", "#ffcc4d", "#f5b800"]);
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      let x = (i*sqrt(3) + j*sqrt(3)/2)*s;
      let y = (j*3/2)*s;
      if (dist(x, y, 0, 0) < 200) {
        let theta0 = (mode == 0) ? 0 : PI/3;
        let k = (mode == 0) ? 0 : 2;
        for (let theta = theta0+PI/6; theta < TWO_PI; theta += TWO_PI/3) {
          push();
          translate(x + cos(theta)*s/2, y + sin(theta)*s/2);
          rotate(theta+PI/2);
          fill(colors[(k++)%3]);
          makeRhombus(s, t, random([1, 4]));
          pop();
        }
      }
    }
  }
}

/*
Make a rhombus centered on (0, 0)
s: long (horizontal) diagonal
t: short (vertical) disagonal
l: number of lines going accross, minus 1
*/

function makeRhombus(s, t, l) {
  beginShape();
  vertex(0, -s/2);
  vertex(t/2, 0);
  vertex(0, s/2);
  vertex(-t/2, 0);
  endShape(CLOSE);

  stroke(0);
  let a = [0, -s/2]; // top vertex
  let b = [t/2, 0]; // right vertex
  let c = [0, s/2]; // bottom vertex
  let d = [-t/2, 0]; // left vertex

  let inverted = false;
  if (random() < 1/2) {
    [b, d] = [d, b];
    inverted = true;
  }

  for (let z = 0; z <= 1; z += 1/l) {
    let [x1, y1] = lerp2D(a, b, z);
    let [x2, y2] = lerp2D(d, c, z);
    line(x1, y1, x2, y2);
  }

  if (random() < 1/3) {
    if (random() < 1/2) {
      [b, d] = [d, b];
    }
    let e = lerp2D(b, c, 1/2);
    let f = lerp2D(a, d, 1/2);
    let g = lerp2D(f, e, 1/3);
    let h = lerp2D(f, e, 2/3);
    let i = lerp2D(d, c, 2/3);
    let j = lerp2D(d, c, 1/3);
    quad(g[0], g[1], h[0], h[1], i[0], i[1], j[0], j[1]);

    let k = lerp2D(h, i, 1/2);
    let m = lerp2D(g, j, 1/2);
    let n = lerp2D(k, m, random([1, 2])/3);
    point(n[0], n[1]);
  } else if (random() < 1/2 && (l == 1)) {
    let e = lerp2D(b, c, 1/4);
    let f = lerp2D(b, c, 3/4);
    let g = lerp2D(d, a, 1/4);
    let h = lerp2D(d, a, 3/4);
    let i = lerp2D(e, h, 3/4);
    let j = lerp2D(e, h, 1/4);
    let k = lerp2D(f, g, 1/4);
    let m = lerp2D(f, g, 3/4);
    quad(i[0], i[1], j[0], j[1], k[0], k[1], m[0], m[1]);

    let n = lerp2D(i, j, 1/2);
    let o = lerp2D(j, k, 1/2);
    let p = lerp2D(k, m, 1/2);
    let q = lerp2D(m, i, 1/2);
    line(n[0], n[1], p[0], p[1]);
    line(o[0], o[1], q[0], q[1]);
  }
}

function lerp2D(a, b, t) {
  let xC = (1-t)*a[0] + t*b[0];
  let yC = (1-t)*a[1] + t*b[1];
  return [xC, yC];
}
