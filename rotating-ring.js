function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}
var pressed = false;
var degree = 0;
var bpm = 120;
var rotationRate = bpm * 0.004;
var numCircles = 7;
var baseCircleDist = 100;
var circleDist = baseCircleDist;
var radius = 40;
var angleSpace = 2 * Math.PI / numCircles;
var clr = '#1fa68d';
var expandedCircleDist = 150;
var expansionRate = 0.7;
var returnToBaseRate = 0.2;

function draw() {
  clear();
  background(0);
  if (pressed) {
    circleDist = expansionRate * expandedCircleDist
      					+ (1 - expansionRate) * circleDist;
  } else {
    circleDist = returnToBaseRate * baseCircleDist
      					+ (1 - returnToBaseRate) * circleDist;
  }
  for (var i = 0; i < numCircles; i++) {
    var angle = i * angleSpace + degree * Math.PI / 180;
    fill(clr);
    ellipse(width / 2 + circleDist * Math.cos(angle),
      height / 2 + circleDist * Math.sin(angle),
      radius, radius);
  }
  degree = (degree + rotationRate) % 360;
}

function keyPressed() {
  pressed = true;
}

function keyReleased() {
  pressed = false;
}
