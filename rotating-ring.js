function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  strokeWeight(3);
}
var pressed = false;

var bpm = 120;
var rotationRate = bpm * 0.004;
var numCircles = 8;
var baseOuterCircleDist = 100;
var outerCircleDist = baseOuterCircleDist;
var baseOuterRadius = 30;
var outerRadius = baseOuterRadius;
var baseInnerCircleDist = 50;
var innerCircleDist = baseInnerCircleDist;
var baseInnerRadius = 20;
var innerRadius = baseInnerRadius;
var angleSpace = 2 * Math.PI / numCircles;
var outerDegree = 0;
var innerDegree = outerDegree + (angleSpace/2 * 180 / Math.PI);
var outerColor = '#4e00f5';
var innerColor = '#1278af';
var outerStroke = '#0000f5';
var innerStroke = '#1754d9';
var expandedOuterCircleDist = 150;
var expandedInnerCircleDist = 100;
var expansionRate = 0.7;
var returnToBaseRate = 0.1;
var expandedOuterRadius = 60;
var expandedInnerRadius = 40;

function draw() {
  clear();
  background(0);
  if (pressed) {
    outerCircleDist = expansionRate * expandedOuterCircleDist
      					+ (1 - expansionRate) * outerCircleDist;
    innerCircleDist = expansionRate * expandedInnerCircleDist
      					+ (1 - expansionRate) * innerCircleDist;
    outerRadius = expansionRate * expandedOuterRadius
      					+ (1 - expansionRate) * outerRadius;
    innerRadius = expansionRate * expandedInnerRadius
      					+ (1 - expansionRate) * innerRadius;
    var outerStroke = '#16daa6';
		var innerStroke = '#16daa6';
  } else {
    outerCircleDist = returnToBaseRate * baseOuterCircleDist
      					+ (1 - returnToBaseRate) * outerCircleDist;
    innerCircleDist = returnToBaseRate * baseInnerCircleDist
      					+ (1 - returnToBaseRate) * innerCircleDist;
    outerRadius = returnToBaseRate * baseOuterRadius
      					+ (1 - returnToBaseRate) * outerRadius;
    innerRadius = returnToBaseRate * baseInnerRadius
      					+ (1 - returnToBaseRate) * innerRadius;
    var outerStroke = '#0000f5';
		var innerStroke = '#1754d9';
  }
  for (var i = 0; i < numCircles; i++) {
    var outerAngle = i * angleSpace + outerDegree * Math.PI / 180;
    var innerAngle = i * angleSpace + innerDegree * Math.PI / 180;
    fill(outerColor);
    stroke(outerStroke);
    ellipse(width / 2 + outerCircleDist * Math.cos(outerAngle),
      height / 2 + outerCircleDist * Math.sin(outerAngle),
      outerRadius, outerRadius);
    fill(innerColor);
    stroke(innerStroke);
    ellipse(width / 2 + innerCircleDist * Math.cos(innerAngle),
      height / 2 + innerCircleDist * Math.sin(innerAngle),
      innerRadius, innerRadius);
  }
  outerDegree = (outerDegree + rotationRate) % 360;
  innerDegree = (innerDegree + rotationRate) % 360;
}

function keyPressed() {
  pressed = true;
}

function keyReleased() {
  pressed = false;
}
