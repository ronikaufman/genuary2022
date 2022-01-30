/*
Genuary 2022
JAN.29 "Isometric perspective."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500, WEBGL);
  noLoop();
  noStroke();
}

function draw() {
  let t = 50;
  let s = t/sqrt(3);
  let n = 6;
  let colors = shuffle([0, 255, random(["#0863d3", "#f5d216", "#f43809", "#08b233"])]);
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      let x = (i*sqrt(3) + j*sqrt(3)/2)*s;
      let y = (j*3/2)*s;
      if (dist(x, y, 0, 0) < 2000) {
        makeStaircase(x, y, s, colors);
      }
    }
  }

  translate(-width/2, -height/2);
  fill(255);
  let margin = 50;
  rect(0, 0, width, margin);
  rect(0, 0, margin, height);
  rect(0, height-margin, width, margin);
  rect(width-margin, 0, margin, height);
}

function makeStaircase(x0, y0, s, colors) {
  let orientation = random([0, 1]);
  let col1, col2, col3;
  let theta1, theta2;
  if (orientation == 0) {
    col1 = colors[0];
    col2 = colors[1];
    col3 = colors[2];
    theta1 = -PI/6;
    theta2 = -5*PI/6;
  } else {
    col1 = colors[1];
    col2 = colors[0];
    col3 = colors[2];
    theta1 = -5*PI/6;
    theta2 = -PI/6;
  }

  fill(col1);
  beginShape();
  for (let theta = PI/6; theta < TAU; theta += TAU/6) {
    vertex(x0 + s*cos(theta), y0 + s*sin(theta));
  }
  endShape(CLOSE);

  let v1 = p5.Vector.fromAngle(-PI/2, s/3);
  let v2 = p5.Vector.fromAngle(theta1, s/3);
  let v3 = p5.Vector.fromAngle(theta2, s);
  let xA = x0 + s*cos(PI/2), yA = y0 + s*sin(PI/2);
  let xB = xA + v1.x, yB = yA + v1.y;
  let xC = xB + v2.x, yC = yB + v2.y;
  let xD = xC + v1.x, yD = yC + v1.y;
  let xE = xD + v2.x, yE = yD + v2.y;
  let xF = xE + v1.x, yF = yE + v1.y;
  let xG = xF + v2.x, yG = yF + v2.y;

  fill(col2);
  quad(xA, yA, xA + v3.x, yA + v3.y, xB + v3.x, yB + v3.y, xB, yB);
  quad(xC, yC, xC + v3.x, yC + v3.y, xD + v3.x, yD + v3.y, xD, yD);
  quad(xE, yE, xE + v3.x, yE + v3.y, xF + v3.x, yF + v3.y, xF, yF);

  fill(col3);
  quad(xB, yB, xB + v3.x, yB + v3.y, xC + v3.x, yC + v3.y, xC, yC);
  quad(xD, yD, xC + v3.x, yD + v3.y, xE + v3.x, yE + v3.y, xE, yE);
  quad(xF, yF, xF + v3.x, yF + v3.y, xG + v3.x, yG + v3.y, xG, yG);
}
