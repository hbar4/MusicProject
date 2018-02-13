var y = 100;
var pressed = false;
var radius = 20;
var increment = 5;
var numCircles = 7;

function setup() {
	createCanvas(500, 500);
	frameRate(50);
}

function draw() {
	clear();
	background(0);
	y = y + increment;
	if (y < radius) {
		y = radius;
    increment *= -1;
	}
  if (y > height - radius) {
    y = height - radius;
    increment *= -1;
  }
  if (pressed) {
    radius = 60;
  } else {
    radius = 20;
  }
	stroke(random(255));
	fill("blue");
	var mod = random(radius);
  var circleY = y;
  for (var i = 0; i < numCircles; i++) {
    ellipse((i + 1)*width/(numCircles + 1), circleY, radius + mod, radius + mod);
  	circleY = height - circleY;
  }
}

function keyPressed() {
  pressed = true;
}

function keyReleased() {
	pressed = false; 
}
