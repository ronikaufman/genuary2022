/*
Genuary 2022
JAN.5 "Destroy a square."

By Roni Kaufman
https://ronikaufman.github.io

Inspired by an algorithm described by Matt DesLauriers:
  1. start with uniformly random points
  2. cluster them
  3. use a gift wrapping algorithm on each cluster
*/

let margin = 50;
let clusters = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  background(255);
  fill("#2560AC");

  // STEP 1: uniformly random points
  let points = [];
  for (let i = 0; i < 5000; i++) {
    points.push(createVector(random(margin, width-margin), random(margin, height-margin)));
  }

  // STEP 2: k-means algorithm
  let k = 20;
  // initialize centroids randomly
  let centroids = [];
  for (let i = 0; i < k; i++) {
    let c;
    do {
      c = random(points);
    } while (centroids.indexOf(c) != -1)
    centroids.push(c);
    clusters.push([]);
  }
  // assign and update
  let MAX_ITER = 256;
  let count = 0;
  while (true) {
    // assign
    for (let p of points) {
      let argmin = 0;
      let minDist = distSquared(p, centroids[0]);
      for (let i = 1; i < k; i++) {
        let d = distSquared(p, centroids[i]);
        if (d < minDist) {
          minDist = d;
          argmin = i;
        }
      }
      clusters[argmin].push(p);
    }
    // update
    let newCentroids = [];
    for (let clu of clusters) {
      let x = 0, y = 0;
      for (let p of clu) {
        x += p.x;
        y += p.y;
      }
      newCentroids.push([x/clu.length, y/clu.length]);
    }

    // check if we stop
    if (++count > MAX_ITER) break;
    let stableCentroids = true;
    for (let i = 0; i < k; i++) {
      if (!centroids[i].equals(newCentroids[i])) stableCentroids = false;
    }
    if (stableCentroids) break;
  }
}

function draw() {
  // STEP 3: Gift wrapping with Jarvis march, cluster by cluster
  // adapted from https://en.wikipedia.org/wiki/Gift_wrapping_algorithm#Pseudocode
  let clu = clusters[frameCount-1];
  clu.sort((p, q) => p.x - q.x);
  let hull = [];
  let i = 0;
  let endPoint;
  let pointOnHull = clu[0];
  beginShape();
  do {
    vertex(pointOnHull.x, pointOnHull.y);
    hull.push(pointOnHull);
    endPoint = clu[0];
    for (let j = 0; j < clu.length; j++) {
      let p = p5.Vector.sub(endPoint, pointOnHull);
      let q = p5.Vector.sub(clu[j], pointOnHull);
      if (endPoint.equals(pointOnHull) || (p.cross(q)).z < 0) {
        endPoint = clu[j];
      }
    }
    i++;
    pointOnHull = endPoint;
  } while (!endPoint.equals(clu[0]));
  endShape(CLOSE);

  if (clusters.length == frameCount) noLoop();
}

function distSquared(p, q) {
  return sq(p.x - q.x) + sq(p.y - q.y);
}
