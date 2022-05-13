
let diametre_particules = 75;
let nombre_particules = 200;
var image_gomme; 

/////////////////
// PHYSICIS MATTER
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  image_gomme = loadImage("stroke_cloth.png");
  background(0);
  noStroke();
  
  fill(255);
    // AFFICHAGE DES PARTICULES
  for (var i = 0; i < nombre_particules; i++) {
    var rayon = diametre_particules;
    var x = random(windowWidth);
    var y = random(windowHeight);

    ellipse(x, y, rayon, rayon);
  }
}

function draw() {
  if (mouseIsPressed) {
    push();
    translate(mouseX, mouseY);
    imageMode(CENTER)
    image(image_gomme,0,0);
    pop();
  }
}