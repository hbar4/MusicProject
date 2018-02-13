var yoff = 0.0;        // 2nd dimension of perlin noise
var pressed = false;
var increment = 0.02;
var baseY = 200;
var highY = 300;
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2;


function setup() {
  createCanvas(710, 400);
  colorMode(RGB);
  b1 = color('purple');
  b2 = color('black');
  
}

function draw() {
	setGradient(0, 0, width, height, b2, b1, Y_AXIS);
  fill(255);
  // We are going to draw a polygon out of the wave points
  // beginShape(); 
  
  if (pressed) {
    increment = 0.05;
    baseY = 0;
    highY = 400;
  } else {
    increment = 0.02;
    baseY = 200;
    highY = 300;
  }
  var xoff = 0;       // Option #1: 2D Noise
  // var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 30) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, baseY, highY);

    // Option #2: 1D Noise
    // var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    stroke("green");
    strokeWeight(3);
    ellipse(x, y, 20, 20);
    // Increment x dimension for noise
    xoff += increment;
  }
  // increment y dimension for noise
  yoff += increment;
  // vertex(width, height);
  // vertex(0, height);
  // endShape(CLOSE);
}

function keyPressed() {
  pressed = true;
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function keyReleased() {
  pressed = false;
}
