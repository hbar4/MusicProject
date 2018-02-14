// Keyboard variables
var bpm = 60;
var base_freqs = {
  	"ab" : 25.96,
  	"a" : 27.5,
    "a#" : 29.14,
  	"bb" : 29.14,
  	"b" : 30.87,
  	"b#" : 16.35,
  	"cb" : 30.87,
  	"c" : 16.35,
  	"c#" : 17.32,
  	"db" : 17.32,
  	"d" : 18.35,
  	"d#" : 19.45,
  	"eb" : 19.45,
  	"e" : 20.60,
  	"e#" : 21.83,
  	"fb" : 20.60,
  	"f" : 21.83,
  	"f#" : 23.12,
  	"gb" : 23.12,
  	"g" : 24.5,
  	"g#" : 25.96
};
var leftSideKeyboard = ['Q', 'W', 'E', 'R', 'T', 
                        'A', 'S', 'D', 'F', 'G',
                        'Z', 'X', 'C', 'V', 'B'];
var rightSideKeyboard = ['Y', 'U', 'I', 'O', 'P',
                         'H', 'J', 'K', 'L', ';',
                         'N', 'M', ',', '.', '/'];
var oscillators = [];
// Animation variables
var rightSidePressed = false;




// Keyboard classes
class Note {
  getFreq(note) {
    var note_octave = note.split(".");
    var base_freq = base_freqs[note_octave[0]];
    var octave = parseInt(note_octave[1]);
    return Math.pow(2, octave) * base_freq;
  }
  
	constructor(note) {
  	this.freq = this.getFreq(note);
  }
  
  
}

class PlayableChunk {
  constructor(notes, length, velocity = 0.5, attack = 0.05, decay = 0.05) {
    this.notes = notes;
    this.length = length;
    this.velocity = velocity;
    this.attack = attack;
    this.decay = decay;
  }
  
  play() {
    var startTime = millis();
    var oscs = [];
    for (var i = 0; i < this.notes.length; i++) {
      oscs.push(new p5.Oscillator());
      oscs[i].setType('triangle');
      oscs[i].freq(this.notes[i].freq);
      oscs[i].amp(0);
      oscs[i].start();
      oscs[i].amp(this.velocity, this.attack);
      oscillators.push({"osc" : oscs[i], 
                        "endTime" : this.length/bpm * 60 * 1000 + startTime});
    }
  }
}

class Track {
  constructor(chunks, oscType) {
    this.chunks = chunks;
    this.oscType = oscType;
  }
}

class Song {
  constructor(tracks, bpm) {
    this.currentTime = 0;
    this.tracks = tracks;
    this.bpm = bpm;
  }
}

// function readTrackFromJSON(path, oscType) {
  
// }

// Animation class
class AnimationScheme {
  constructor(baseAnimationFunc, intenseAnimationFunc, vars) {
    this.baseAnimationFunc = baseAnimationFunc;
    this.intenseAnimationFunc = intenseAnimationFunc;
    this.vars = vars;
  }
  
  baseAnim(colorScheme) {
    this.baseAnimationFunc(this.vars, colorScheme);
  }
  
  intenseAnim(colorScheme) {
    this.intenseAnimationFunc(this.vars, colorScheme);
  }
}

// Color Scheme class
class ColorScheme {
  constructor(gradient1, gradient2, 
              primaryFill, primaryStroke, 
              secondaryFill, secondaryStroke,
              highlight) {
    this.gradient1 = gradient1;
    this.gradient2 = gradient2;
    this.primaryFill = primaryFill;
    this.primaryStroke = primaryStroke;
    this.secondaryFill = secondaryFill;
    this.secondaryStroke = secondaryStroke;
    this.highlight = highlight;
  }
}

var trackIndex = 0;

var track = [new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("c.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("g.5")], 0.25),
             new PlayableChunk([new Note("g.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("c.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("e.5")], 0.25),
             new PlayableChunk([new Note("d.5")], 0.25),
             new PlayableChunk([new Note("c.5")], 0.25)
            ];

var track2 = [new PlayableChunk([new Note("c.5"), 
                                 new Note("e.5"),
                                 new Note("g.5")], 0.5),
              new PlayableChunk([new Note("c.5"), 
                                 new Note("f.5"),
                                 new Note("a.5")], 0.5),
              new PlayableChunk([new Note("b.4"), 
                                 new Note("d.5"),
                                 new Note("g.5")], 0.5),
              new PlayableChunk([new Note("b.4"), 
                                 new Note("f.5"),
                                 new Note("g.5")], 0.5),
              new PlayableChunk([new Note("c.5"), 
                                 new Note("e.5"),
                                 new Note("g.5")], 0.5)
             ];
function drawGradient(colorScheme) {
  for (var i = 0; i <= height; i++) {
      var inter = map(i, 0, height, 0, 1);
      var c = lerpColor(color('black'), 
                        lerpColor(color(colorScheme.gradient1),
                        color(colorScheme.gradient2), 
                        mouseX/width),
                        inter);
      stroke(c);
      line(0, i, width, i);
    }
}

function anim1Base(vars, colorScheme) {
	drawGradient(colorScheme);
	vars['y'] = vars['y'] + vars['increment'];
	if (vars['y'] < vars['radius']) {
		vars['y'] = vars['radius'];
    vars['increment'] *= -1;
	}
  if (vars['y'] > height - vars['radius']) {
    vars['y'] = height - vars['radius'];
    vars['increment'] *= -1;
  }
  vars['radius'] = 20;
  strokeWeight(2);
	stroke(colorScheme.primaryStroke);
	fill(color(colorScheme.primaryFill));
	var mod = random(vars['radius']);
  var circleY = vars['y'];
  for (var i = 0; i < vars['numCircles']; i++) {
    ellipse((i + 1)*width/(vars['numCircles'] + 1), 
      			circleY, vars['radius'] + mod, 
      vars['radius'] + mod);
  	circleY = height - circleY;
  }
}

function anim1Intense(vars, colorScheme) {
  drawGradient(colorScheme);
	vars['y'] = vars['y'] + vars['increment'];
	if (vars['y'] < vars['radius']) {
		vars['y'] = vars['radius'];
    vars['increment'] *= -1;
	}
  if (vars['y'] > height - vars['radius']) {
    vars['y'] = height - vars['radius'];
    vars['increment'] *= -1;
  }
  vars['radius'] = 60;
  strokeWeight(2);
	stroke(colorScheme.highlight);
	fill(colorScheme.primaryFill);
	var mod = random(vars['radius']);
  var circleY = vars['y'];
  for (var i = 0; i < vars['numCircles']; i++) {
    ellipse((i + 1)*width/(vars['numCircles'] + 1), 
      			circleY, vars['radius'] + mod, 
      vars['radius'] + mod);
  	circleY = height - circleY;
  }
}
// Anim 1 Variables
var vars1 = {
  						"y" : 100,
  						"radius" : 20,
  						"increment" : 5,
  						"numCircles" : 7
						}
var anim1 = new AnimationScheme(anim1Base, anim1Intense, vars1);

function anim2Base(vars, colorScheme) {
  drawGradient(colorScheme);
  vars['outerCircleDist'] = 
    vars['returnToBaseRate'] * vars['baseOuterCircleDist'] + 
    (1 - vars['returnToBaseRate']) * vars['outerCircleDist'];
  vars['innerCircleDist'] = 
    vars['returnToBaseRate'] * vars['baseInnerCircleDist'] +
    (1 - vars['returnToBaseRate']) * vars['innerCircleDist'];
  vars['outerRadius'] = 
    vars['returnToBaseRate'] * vars['baseOuterRadius'] +
    (1 - vars['returnToBaseRate']) * vars['outerRadius'];
  vars['innerRadius'] = 
    vars['returnToBaseRate'] * vars['baseInnerRadius'] +
    (1 - vars['returnToBaseRate']) * vars['innerRadius'];
  var outerStroke = colorScheme.primaryStroke;
	var innerStroke = colorScheme.secondaryStroke;
  for (var i = 0; i < vars['numCircles']; i++) {
    var outerAngle = i * vars['angleSpace'] + 
        		vars['outerDegree'] * Math.PI / 180;
    var innerAngle = i * vars['angleSpace'] + 
        		vars['innerDegree'] * Math.PI / 180;
    
    fill(colorScheme.primaryFill);
    stroke(outerStroke);
    ellipse(width / 2 + vars['outerCircleDist'] * Math.cos(outerAngle),
      height / 2 + vars['outerCircleDist'] * Math.sin(outerAngle),
      vars['outerRadius'], vars['outerRadius']);
    
    fill(colorScheme.secondaryFill);
    stroke(innerStroke);
    ellipse(width / 2 + vars['innerCircleDist'] * Math.cos(innerAngle),
      height / 2 + vars['innerCircleDist'] * Math.sin(innerAngle),
      vars['innerRadius'], vars['innerRadius']);
  }
	vars['outerDegree'] = (vars['outerDegree'] + vars['rotationRate']) % 360;
  vars['innerDegree'] = (vars['innerDegree'] + vars['rotationRate']) % 360;
}

function anim2Intense(vars, colorScheme) {
  drawGradient(colorScheme);
  vars['outerCircleDist'] = 
    vars['expansionRate'] * vars['expandedOuterCircleDist'] + 
    (1 - vars['expansionRate']) * vars['outerCircleDist'];
  vars['innerCircleDist'] = 
    vars['expansionRate'] * vars['expandedInnerCircleDist'] +
    (1 - vars['expansionRate']) * vars['innerCircleDist'];
  vars['outerRadius'] = 
    vars['expansionRate'] * vars['expandedOuterRadius'] +
    (1 - vars['expansionRate']) * vars['outerRadius'];
  vars['innerRadius'] = 
    vars['expansionRate'] * vars['expandedInnerRadius'] +
    (1 - vars['expansionRate']) * vars['innerRadius'];
  var outerStroke = colorScheme.highlight;
	var innerStroke = colorScheme.highlight;
  for (var i = 0; i < vars['numCircles']; i++) {
    var outerAngle = i * vars['angleSpace'] + 
        		vars['outerDegree'] * Math.PI / 180;
    var innerAngle = i * vars['angleSpace'] + 
        		vars['innerDegree'] * Math.PI / 180;
    fill(colorScheme.primaryFill);
    stroke(outerStroke);
    ellipse(width / 2 + vars['outerCircleDist'] * Math.cos(outerAngle),
      height / 2 + vars['outerCircleDist'] * Math.sin(outerAngle),
      vars['outerRadius'], vars['outerRadius']);
    fill(colorScheme.secondaryFill);
    stroke(innerStroke);
    ellipse(width / 2 + vars['innerCircleDist'] * Math.cos(innerAngle),
      height / 2 + vars['innerCircleDist'] * Math.sin(innerAngle),
      vars['innerRadius'], vars['innerRadius']);
  }
	vars['outerDegree'] = (vars['outerDegree'] + vars['rotationRate']) % 360;
  vars['innerDegree'] = (vars['innerDegree'] + vars['rotationRate']) % 360;
}
var numCircles = 8;
var vars2 = {
  						"rotationRate" : bpm * 0.004,
  						"numCircles" : numCircles,
  						"baseOuterCircleDist" : 100,
  						"outerCircleDist" : 100,
  						"baseOuterRadius" : 30,
  						"outerRadius" : 30,
  						"baseInnerCircleDist" : 50,
  						"innerCircleDist" : 50,
  						"baseInnerRadius" : 20,
  						"innerRadius" : 20,
  						"angleSpace" : 2 * Math.PI / numCircles,
  						"outerDegree" : 0,
  						"innerDegree" : 180/numCircles,
  						"expandedOuterCircleDist" : 150,
  						"expandedInnerCircleDist" : 100,
  						"expansionRate" : 0.7,
  						"returnToBaseRate" : 0.1,
  						"expandedOuterRadius" : 60,
  						"expandedInnerRadius" : 40
						}

function anim3Base(vars, colorScheme) {
  drawGradient(colorScheme);
  var xoff = 0;       // Option #1: 2D Noise
  // var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 30) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, vars["yoff"]), 0, 1, height/2, 2*height/3);

    // Option #2: 1D Noise
    // var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    stroke(colorScheme.primaryStroke);
    strokeWeight(2);
    fill(colorScheme.primaryFill);
    ellipse(x, y, 20, 20);
    // Increment x dimension for noise
    xoff += 0.02;
  }
  // increment y dimension for noise
  vars["yoff"] += 0.02;
}

function anim3Intense(vars, colorScheme) {
  drawGradient(colorScheme);
  var xoff = 0;       // Option #1: 2D Noise
  // var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 30) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, vars["yoff"]), 0, 1, 0, 4*height/5);

    // Option #2: 1D Noise
    // var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    stroke(colorScheme.highlight);
    strokeWeight(2);
    fill(colorScheme.primaryFill);
    ellipse(x, y, 20, 20);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  vars["yoff"] += 0.05;
}

var vars3 = {
							"yoff" : 0
						};

var anim1 = new AnimationScheme(anim1Base, anim1Intense, vars1);
var anim2 = new AnimationScheme(anim2Base, anim2Intense, vars2);
var anim3 = new AnimationScheme(anim3Base, anim3Intense, vars3);
var colorScheme1 = new ColorScheme('#01035b', '#012b17',
                                  'black', '#b2f6ff',
                                  'black', '#00ff37',
                                  '#02ff35');
var colorScheme2 = new ColorScheme('#c41919', '#ffb600',
                                  '#b70e84', '#ff0f93',
                                  '#c235ff', '#f9af1b',
                                  '#fffb16');
var colorScheme3 = new ColorScheme('#020e70', '#008cff',
                                  '#6132ad', '#4600b7',
                                  '#4600b7', '#6132ad',
                                  '#ffffff');
var colorScheme4 = new ColorScheme('#efe6e6', '#515654',
				  '#9b0101', '#f7a0a0',
				  '#630000', '#edd7d7',
				  'white');
var colorScheme5 = new ColorScheme('#eef5db', '#f7ce99',
				   '#f7a90e', '#ed6200',
				   '#705d56', '#ed8500',
				   'red');

var currentAnim = anim1;
var currentColorScheme = colorScheme1;
function setup() { 
  createCanvas(600, 400);
} 

function endFinishedOscillators() {
  for (var i = 0; i < oscillators.length; i++) {
    if (oscillators[i]["endTime"] < millis()) {
      oscillators[i]["osc"].amp(0, 0.1);
      oscillators[i]["osc"].stop();
    }
  }
}

function draw() {
  if (rightSidePressed) {
  	currentAnim.intenseAnim(currentColorScheme);
  } else {
    currentAnim.baseAnim(currentColorScheme);
  }
  endFinishedOscillators();
}

function keyPressed() {
  if (leftSideKeyboard.indexOf(key) >= 0) {
    track2[trackIndex].play();
    trackIndex += 1;
    trackIndex %= track2.length;
  }
  if (rightSideKeyboard.indexOf(key) >= 0) {
    rightSidePressed = true;
  }
  if (key == 1) {
    currentAnim = anim1;
  }
  if (key == 2) {
    currentAnim = anim2;
  }
  if (key == 3) {
    currentAnim = anim3;
  }
  if (key == 6) {
    currentColorScheme = colorScheme1;
  }
  if (key == 7) {
    currentColorScheme = colorScheme2;
  }
  if (key == 8) {
    currentColorScheme = colorScheme3;
  }
  if (key == 9) {
    currentColorScheme = colorScheme4;
  }
  if (key == 0) {
    currentColorScheme = colorScheme5;
  }
}

function keyReleased() {
    if (rightSideKeyboard.indexOf(key) >= 0) {
    rightSidePressed = false;
  }
}
