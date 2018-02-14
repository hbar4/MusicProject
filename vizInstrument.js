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
    }
    while (millis() - startTime < this.length/bpm * 60 * 1000) {
    }
    for (var i = 0; i < this.notes.length; i++) {
      oscs[i].amp(0, this.decay);
      oscs[i].stop();
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

var colorScheme1 = new ColorScheme('#01035b', '#012b17',
                                  'black', '#b2f6ff',
                                  'black', '#00ff37',
                                  '#02ff35');

var currentAnim = anim1;
var currentColorScheme = colorScheme1;
function setup() { 
  createCanvas(400, 400);
} 

function draw() {
  if (rightSidePressed) {
  	currentAnim.intenseAnim(currentColorScheme);
  } else {
    currentAnim.baseAnim(currentColorScheme);
  }  
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
}

function keyReleased() {
    if (rightSideKeyboard.indexOf(key) >= 0) {
    rightSidePressed = false;
  }
}
