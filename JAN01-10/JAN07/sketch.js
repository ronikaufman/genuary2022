/*
Genuary 2022
JAN.7 "Sol LeWitt Wall Drawing."

By Roni Kaufman
https://ronikaufman.github.io

Inspired by Sol LeWitt's Wall Drawings
*/

let margin = 50;
let colors = ["#ffe03d", "#fe4830", "#d33033", "#6d358a", "#1c509e", "#00953c"];

function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
  noLoop();
  background(255);
}

function draw() {
  translate(-width/2, -height/2);
  wallDrawing684A();
  //wallDrawing1112();
  //wallDrawing1152();
  //wallDrawing692();
}

function wallDrawing1112() {
  // Square with broken bands of color.
  let s = 20;
  for (let c = width - 2*margin; c > 0; c -= 2*s) {
    let x0 = y0 = (width - c)/2;
    shuffle(colors, true);
    let i = 0;
    for (let x = x0; x < width - x0; x += 2*s) {
      fill(colors[i%colors.length]);
      rect(x, y0, 2*s, s);
      i++;
    }
    for (let y = y0 + s; y < height - y0 - s; y += 2*s) {
      fill(colors[i%colors.length]);
      rect(width - x0 - s, y, s, 2*s);
      i++;
    }
    for (let x = width - x0 - 2*s; x > x0 - s; x -= 2*s) {
      fill(colors[i%colors.length]);
      rect(x, height - y0 - s, 2*s, s);
      i++;
    }
    for (let y = height - y0 - 3*s; y > y0 - s; y -= 2*s) {
      fill(colors[i%colors.length]);
      rect(x0, y, s, 2*s);
      i++;
    }
  }
}

function wallDrawing684A() {
  // Squares bordered and divided horizontally and vertically into four equal squares, each with bands in one of four directions.
  let s = (width - 2*margin) / 15;
  fill(0);
  square(margin, margin, width - 2*margin);

  let i = 0;
  let colors1 = shuffle(colors);
  let colors2 = shuffle(colors);
  for (let z = margin + s; z < width/2 - s; z += s) {
    fill(colors1[(i++)%colors.length]);
    rect(z, margin + s, s, 6*s);
    fill(colors2[i%colors.length]);
    rect(margin + 8*s, z, 6*s, s);
  }

  i = 0;
  colors1 = shuffle(colors);
  colors2 = shuffle(colors);
  for (let z = 0; z < 6*s; z += s) {
    fill(colors1[(i++)%colors.length]);
    quad(
      margin + s + z, margin + 8*s,
      margin + 2*s + z, margin + 8*s,
      margin + s, margin + 9*s + z,
      margin + s, margin + 8*s + z
    );
    quad(
      margin + 7*s, margin + 8*s + z,
      margin + 7*s, margin + 9*s + z,
      margin + 2*s + z, margin + 14*s,
      margin + s + z, margin + 14*s
    );
    fill(colors2[i%colors.length]);
    quad(
      margin + 8*s + z, margin + 8*s,
      margin + 9*s + z, margin + 8*s,
      margin + 14*s, margin + 13*s - z,
      margin + 14*s, margin + 14*s - z
    );
    quad(
      margin + 8*s + z, margin + 14*s,
      margin + 9*s + z, margin + 14*s,
      margin + 8*s, margin + 13*s - z,
      margin + 8*s, margin + 14*s - z
    )
  }
}

function wallDrawing1152() {
  // Whirls and twirls.
  let n = 2;
  let s = 120;
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      let x1 = width/2+(i*sqrt(3) + j*sqrt(3)/2)*s;
      let y1 = height/2+(j*3/2)*s;
      let theta0 = PI/6;
      for (let theta = PI/6; theta < TAU; theta += PI/3) {
        let x2 = x1 + s*cos(theta), y2 = y1 + s*sin(theta);
        let x3 = x1 + s*cos(theta+PI/3), y3 = y1 + s*sin(theta+PI/3);
        let x0 = (x1+x2+x3)/3, y0 = (y1+y2+y3)/3;

        push();
        translate(x0, y0);
        rotate(floor(random(3))*TAU/3);
        let k = 0;
        shuffle(colors, true);
        for (let d = s; d > 0; d -= s/4) {
          fill(colors[(k++)%colors.length]);
          arc(x1-x0, y1-y0, d, d, theta0, theta0+PI/3);
        }
        k = 0;
        shuffle(colors, true);
        for (let d = s*5/4; d > 0; d -= s/4) {
          fill(colors[(k++)%colors.length]);
          arc(x2-x0, y2-y0, d, d, theta0 + 2*PI/3, theta0 + PI/3 + 2*PI/3);
        }
        k = 0;
        shuffle(colors, true);
        for (let d = s*6/4; d > 0; d -= s/4) {
          fill(colors[(k++)%colors.length]);
          arc(x3-x0, y3-y0, d, d, theta0 + 4*PI/3, theta0 + PI/3 + 4*PI/3);
        }

        pop();
        theta0 += PI/3;
      }
    }
  }

  fill(255);
  rect(0, 0, width, margin);
  rect(0, 0, margin, height);
  rect(0, height-margin, width, margin);
  rect(width-margin, 0, margin, height);
}

function wallDrawing692() {
  // Continuous forms with color ink washes superimposed.
  let points = [];
  for (let i = 0; i < 6; i++) {
    let x = random(margin, width-margin);
    let y = random(margin, height-margin);
    points.push(createVector(x, y));
  }
  for (let x = margin; x < width - margin; x += 1/2) {
    for (let y = margin; y < height - margin; y += 1/2) {
      let v = createVector(x, y);
      let argmin = 0;
      let minDist = v.dist(points[0]);
      for (let i = 1; i < points.length; i++) {
        let d = v.dist(points[i]);
        if (d < minDist) {
          argmin = i;
          minDist = d;
        }
      }
      fill(colors[argmin%6]);
      square(x, y, 1/2);
    }
  }

  let n = 8;
  let s = (width - 2*margin) / (3*n+2);
  fill(0);
  rect(margin + n*s, margin, s, height - 2*margin);
  rect(margin + (2*n+1)*s, margin, s, height - 2*margin);
  rect(margin, margin + n*s, width - 2*margin, s);
  rect(margin, margin + (2*n+1)*s, width - 2*margin, s);
}
