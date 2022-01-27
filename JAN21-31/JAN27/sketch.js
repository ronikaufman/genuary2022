/*
Genuary 2022
JAN.27 "#2E294E #541388 #F1E9DA #FFD400 #D90368"

By Roni Kaufman
https://ronikaufman.github.io
*/


function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
  noLoop();
}

function draw() {
  background(255);
  rotate(random([0, PI/2, PI, 3*PI/2]));
  translate(-width/2, -height/2);


  let margin = 50;
  let palette = ["#2E294E", "#541388", "#F1E9DA", "#FFD400", "#D90368"];
  let y = margin;
  while (y < height - margin - 0.01) {
    let s = (width - 2*margin) / random([6, 12]);
    if (y + s > height - margin - 0.01) s = (width - 2*margin) / 12;
    let ids = shuffle([0, 1, 2]);
    let i = 0;
    let x = random([margin, margin-s/2]);
    while (x < width + s - margin) {
      shuffle(palette, true);
      makeTile(x, y, s, ids[(i++)%3], palette[0], palette[1]);
      x += s;
    }
    y += s;
  }

  fill(255);
  rect(0, 0, margin, height);
  rect(width - margin, 0, margin, height);
}

function makeTile(x, y, s, id, col1, col2) {
  push();
  translate(x+s/2, y+s/2);
	rotate(random([0, PI/2, PI, 3*PI/2]));
  fill(col1);
  square(-s/2, -s/2, s);
  fill(col2);
  switch (id) {
    case 0:
			let thetaStep = TAU/6;
			beginShape();
      for (let theta = 0; theta < TAU; theta += thetaStep) {
				vertex(s/3*cos(theta), s/3*sin(theta));
			}
			endShape(CLOSE);
      break;
    case 1:
      circle(0, 0, s/2);
			break;
		case 2:
			square(-s/4, -s/4, s/2);
  }
  pop();
}
