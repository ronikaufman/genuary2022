/*
Genuary 2022
JAN.3 "Space."

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

  let margin = 50;
  fill(0);
  square(margin, margin, width-2*margin);

  translate(width/2, height/2);
  rotate(random(PI/8, PI/6)*random([-1, 1]));

  let n = 400;
  for (let i = 0; i < n; i++) {
		let alpha = 255 * (1 - i / n);
		fill(250, alpha);
		let size = i;
		let k = 100 * (i / n);
		let noisiness = 500 * pow(i / n, 3);
    blobSpiral(size, 0, 0, k, i / 20, noisiness);
  }
}

function blobSpiral(size, xCenter, yCenter, k, t, noisiness) {
	let theta0 = random(TAU);
	let theta = theta0;
	let h = random(0.6, 0.7);
	for (let theta = 0; theta < TAU; theta += 0.01) {
		let r1 = cos(theta+theta0) + 1;
		let r2 = sin(theta+theta0) + 1;
		let s = map(theta, 0, TAU, 0, size);
    let r = s + noise(k * r1, k * r2, t) * noisiness * random(0.8, 1.2);
		let rh = r * h;
    let x = xCenter + r * cos(theta+theta0);
    let y = yCenter + rh * sin(theta+theta0);
    circle(x, y, random(1.2));
  }
}
