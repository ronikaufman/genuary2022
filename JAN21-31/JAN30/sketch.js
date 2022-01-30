/*
Genuary 2022
JAN.30 "Organic looking output using only rectangular shapes."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  rectMode(CENTER);
  angleMode(DEGREES);
  strokeWeight(1);
}

function draw() {
  background(255);
  let margin = 50;

  let inter = 15;
  let circles = [];
  for (let i = 0; i < 5000; i++) {
    let r = 40;
    let x = random(margin+r, width-margin-r);
    let y = random(margin+r, height-margin-r);
    let newCircle = {
      center: createVector(x, y),
      r: r
    };
    let canAdd = true;
    for (let c of circles) {
      if (c.center.dist(newCircle.center) < c.r + newCircle.r + inter) {
        canAdd = false;
        break;
      }
    }
    if (canAdd) {
      let canGrow;
      do {
        newCircle.r++;
        canGrow = true;
        for (let c of circles) {
          if (c.center.dist(newCircle.center) < c.r + newCircle.r + inter) {
            canGrow = false;
            break;
          }
        }
        if (x - newCircle.r < margin || x + newCircle.r > width - margin || y - newCircle.r < margin || y + newCircle.r > height - margin) {
          canGrow = false;
        }
        if (newCircle.r > 60) {
          canGrow = false;
        }
      } while (canGrow)
      circles.push(newCircle);
    }
  }

  circles.sort((e1, e2) => (e1.center.y - e2.center.y));
  for (let c of circles) {
    noStroke();
    stroke("#417D35")
    fill("#6F9B46");
    for (let y = c.center.y; y < height; y += 10) {
      push();
      translate(c.center.x, y);
      rotate(random(-6, 6));
      rect(0, 0, 2, random(10, 12));
      if (random() < 0.15) {
        let a = random([-1, 1]);
        rotate(a*random(150, 160));
        rect(a*4, 0, 3, 15);
      }
      pop();
    }
    sunflower(c.center.x, c.center.y, 2*c.r);
  }
}

function sunflower(x0, y0, d) {
  stroke("#D77804");
  fill("#FEDA00");
  for (let theta = 0; theta < 360; theta += 360/42) {
    let r = d/4;
    let x = x0 + r*cos(theta);
    let y = y0 + r*sin(theta);
    push();
    translate(x + random(-d/60, d/60), y + random(-d/60, d/60));
    rotate(theta + random(-3, 3));
    rect(0, 0, d/2, d/18);
    pop();
  }

  fill("#F5AC07");
  for (let theta = 0; theta < 360; theta += 360/48) {
    let r = d/5;
    let x = x0 + r*cos(theta);
    let y = y0 + r*sin(theta);
    push();
    translate(x + random(-d/40, d/40), y + random(-d/40, d/40));
    rotate(theta + random(-5, 5));
    rect(0, 0, d/5, d/25);
    pop();
  }

  stroke("#361003");
  fill("#58341A");
  rect(x0, y0, d/10);
  let c = d/60;
  for (let i = 0; i < 150; i++) {
    let theta = i * 137.5;
    let r = c * sqrt(i);
    let x = x0 + r*cos(theta);
    let y = y0 + r*sin(theta);
    push();
    translate(x, y);
    rotate(theta);
    rect(0, 0, d/30, d/10);
    pop();
  }
}
