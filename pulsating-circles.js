var y = 100;

function setup() {
	createCanvas(500, 500);
	frameRate(50);
}

function draw() {
	clear();
	background(0);
	y = y - 1;
	if (y < 0) {
		y = height;
	}
	stroke(random(255));
	fill("blue");
	var mod = random(20);
	ellipse(100, y, 20 + mod, 20+ mod);
	ellipse(200, y, 20+ mod, 20+ mod);
	ellipse(300, y, 20+ mod, 20+ mod);
	ellipse(400, y, 20+ mod, 20+ mod);
}
