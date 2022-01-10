/*
Genuary 2022
JAN.10 "Machine learning, wrong answers only."

By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
  createCanvas(500, 500);
  noLoop();
  noStroke();
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(48);
  fill(0);
}

function draw() {
  background(255);
  let margin = 50;

  let article = generateArticle();
  let x = margin, y = margin + 24;
  for (let i = 0; i < article.length-1; i++) {
    let word = article[i] + " ";
    text(word, x, y);
    x += textWidth(word);
    if (x + textWidth(article[i+1]) > width - margin) {
      x = margin;
      y += 48;
    }
  }
  text(article[article.length-1] + ".", x, y);
}

function generateArticle() {
  let adjectives = ["masked", "deep", "multi-task", "learning", "neural",
    "robust", "scalable", "real-time", "RGB", "CMYK", "open", "free", "3D",
    "extensible", "offline", "online", "multilingual", "self-supervised",
    "audio-visual", "audio-based", "fair", "noisy", "adversial", "generative",
    "subtle", "challenging", "unsupervised", "supervised", "web-based",
    "contrastive", "biased", "unbiased", "reasonable", "real-world",
    "geometric", "topological", "semantic", "multi-scale", "convex", "connex",
    "continuous", "research", "directed", "automated", "artifical",
    "data-driven", "predictive", "intelligent", "rapid", "efficient",
    "empirical", "medical", "bayesian", "smart", "multi-label", "limited",
    "wireless", "stream-based", "defect", "spam", "integrated", "residual",
    "single-headed", "convolutional", "double", "gradient", "bigger", "higher",
    "optimal", "speech", "text"];

  let things = ["autoencoders", "networks", "vision", "transcription", "models",
    "estimations", "packages", "libraries", "applications", "simulators",
    "simulations", "approaches", "recognition", "matrices", "objects",
    "clustering", "datasets", "data", "geometries", "topologies", "setups",
    "representations", "connectors", "connections", "functions", "vectors",
    "frameworks", "formats", "prototypes", "directions", "analytics",
    "intelligence", "criteria", "health care", "contexts", "classifiers",
    "interaction", "content", "apps", "devices", "labels", "images",
    "documents", "feature extraction", "reduction", "techniques",
    "classification", "graphs", "detection", "modifiers", "generation",
    "gradients", "descent", "complexity"];

  let intros = ["Toward", "Benchmarking", "Scaling", "Understanding",
    "The dynamics of", "Analysis of", "A note on", "Studying", "Aligning",
    "Comparing", "About"];

  let connectors = ["for", "with", "without", "of", "using", "in", "based on"];

  return [random(intros), randomDelete(adjectives), randomDelete(things),
    randomDelete(connectors), randomDelete(adjectives), randomDelete(things),
    random(connectors), random(adjectives), random(things)];
}

// deletes a random element from array and returns it
function randomDelete(arr) {
  return arr.splice(floor(random(arr.length)), 1)[0];
}
