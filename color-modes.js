function setup() { 
  createCanvas(400, 400);
} 

var redVal = 0;
var greenVal = 0;
var blueVal = 0;

var mouseMode = 1;

// Mode 0 vars
var leftRedVal = 58;
var leftGreenVal = 10;
var leftBlueVal = 171;
var rightRedVal = 3;
var rightGreenVal = 176;
var rightBlueVal = 92;
                                
function bary(x, y, x0, y0, x1, y1, x2, y2) {
  return (-(x - x1)*(y2 - y1) + (y - y1)*(x2-x1)) /
    			(-(x0 - x1)*(y2 - y1) + (y0 - y1)*(x2-x1));
}

function draw() { 
  if (mouseMode == 0 || mouseMode == 1) {
    redVal = mouseX/width * rightRedVal + 
      			(1 - mouseX/width) * leftRedVal;
    greenVal = mouseX/width * rightGreenVal + 
      			(1 - mouseX/width) * leftGreenVal;
    blueVal = mouseX/width * rightBlueVal + 
      			(1 - mouseX/width) * leftBlueVal;
  }
  if (mouseMode == 1) {
    redVal *= mouseY/height;
    greenVal *= mouseY/height;
    blueVal *= mouseY/height;
  }
  if (mouseMode == 2) {
    if (mouseX > mouseY) {
      var alph = bary(mouseX, mouseY, width, 0, 0, 0, height, width);
      var beta = bary(mouseX, mouseY, 0, 0, height, width, width, 0);
    } else {
      var alph = bary(mouseX, mouseY, 0, height, 0, 0, height, width);
      var beta = bary(mouseX, mouseY, 0, 0, height, width, 0, height);
    }
    var gamma = 1 - alph - beta;
    redVal = alph * 255;
  	greenVal = beta * 255;
    blueVal = gamma * 255;
  }
  background(redVal, greenVal, blueVal);
}

function keyPressed() {
  if (key == 0) {
    mouseMode = 0;
  } else if (key == 1) {
    mouseMode = 1;
  } else if (key == 2) {
    mouseMode = 2;
  }
}
