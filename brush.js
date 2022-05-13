

let diametre_particules = 3;
let nombre_particules = 5000;
let poids_particule = 100;
let friction_particule = 0.000000001;
let friction_air = 0;
let largeur_rectangle = 70;
let hauteur_rectangle = 250;

/////////////////
// PHYSICS ENGINE
var Engine = Matter.Engine;
var Runner = Matter.Runner;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Composites = Matter.Composites;
var Composite = Matter.Composite;

Matter.use('matter-attractors');
var engine;
var world;
var runner;
var canvas;
var outil;
var particules = [];
var peigne;
var mode = "COLLER"


/////////////////
// PHYSICIS MATTER
function setup() {

  /////////////////
  // INITIALISATION
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  runner = Runner.create();
  world = engine.world;
  world.gravity = { x: 0.0, y: 0.0 };

  /////////////////////
  // MURS
  World.add(world, Bodies.rectangle(width / 2, height, width, 1, { isStatic: true }));
  World.add(world, Bodies.rectangle(0, height / 2, 1, height, { isStatic: true }));
  World.add(world, Bodies.rectangle(width, height / 2, 1, height, { isStatic: true }));
  World.add(world, Bodies.rectangle(width / 2, 0, width, 1, { isStatic: true }));

  Runner.run(runner, engine);
  Engine.run(engine); 
  
  //noStroke();
  initialiser_coller();
}


function draw() {
  background(0);
  fill(255);



  // AFFICHAGE DES PARTICULES
  for (var i = 0; i < particules.length; i++) {
    var particule = particules[i];
    var rayon = particule.circleRadius;
    var x = particule.position.x;
    var y = particule.position.y;

    ellipse(x, y, rayon, rayon);
  }

  if (mode == "COLLER") {
    stroke(1);
    fill(255, 0, 0);
    Body.setPosition(outil, { x: mouseX, y: mouseY });
    // AFFICHAGE DEBUG DE LA BROSSE
    beginShape();
    var points_colleur = outil.vertices;
    for (var j = 0; j < points_colleur.length; j++) {
      vertex(points_colleur[j].x, points_colleur[j].y);
    }
    endShape();
  } 
}



// INITIALISER COLLEUR
function initialiser_coller() {

  World.remove(world, particules);
  particules = [];
  for (var i = 0; i < nombre_particules; i++) {

    let pos_x = random(windowWidth );
    let pos_y = random(windowHeight );

    var particule = Bodies.circle(pos_x, pos_y, diametre_particules, {
      friction: friction_particule,
      frictionAir: friction_air,
      mass: poids_particule
    });



    particules.push(particule);

    World.add(world, particule);
  }

  if (outil) {
    World.remove(world, outil);
  }
  outil = Bodies.rectangle(100, 100, largeur_rectangle, hauteur_rectangle, {
    inertia: 100000,
    isStatic: true,
    //frictionStatic:0.00001,
    position: { x: 100, y: 100 },
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {

            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ]
  }
  });
  World.add(world, outil);
  //console.log(Matter);
  //console.log(particules);
}

// INITIALISER POUSSEUR


