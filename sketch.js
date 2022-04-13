var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var black_clover,gameImage 
var restart,restartOP

var die, jump, checkpoint

function preload(){
  trex_running = loadAnimation("wizard_1.png","wizard_2.png","wizard_3.png","wizard_4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Wraith_01_Moving Forward_002.png");
  obstacle2 = loadImage("Wraith_03_Moving Forward_000.png");
  obstacle3 = loadImage("Wraith_02_Moving Forward_000.png");
  obstacle4 = loadImage("Wraith_02_Moving Forward_001.png");
  obstacle5 = loadImage("Wraith_01_Moving Forward_001.png");
  obstacle6 = loadImage("Wraith_03_Moving Forward_001.png");

  black_clover = loadImage("game_over.jpg");
  restart = loadImage("restart.png");

  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  checkpoint = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(70,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.2;
  //trex.debug = true;
  trex.setCollider("circle",0,0,120)

  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -12;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //crie Grupos de Obstáculos e Nuvens
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;

  gameImage = createSprite(625,400,10,10)
  gameImage.addImage(black_clover)
  gameImage.visible = false
  restartOP = createSprite(300,125,10,10)
  restartOP.addImage(restart)
  restartOP.visible = false 
  restartOP.scale = 0.5
  ground.depth = trex.depth
  trex.depth = trex.depth+1
}

function draw() {
  background("white");
  
  textSize(20)
  text("Score: "+ score, 30,50);
  
  
  if(gameState === PLAY){
    trex.changeAnimation("running",trex_running)
    ground.velocityX = -(4+3* score/300) ;
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%300==0){
      checkpoint.play()
    }
    if(keyDown("space")&& trex.y >= 140) {
      trex.velocityY = -13;
     jump.play()

    }
    trex.velocityY = trex.velocityY + 0.8
  if(obstaclesGroup.isTouching(trex)){
    die.play()
    gameState=END
  }
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  }
  else if(gameState === END){
    ground.velocityX = 0;
   
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)

    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1)
    
    trex.changeAnimation("collided",trex_collided)

    gameImage.visible = true
    restartOP.visible = true

    if(mousePressedOver(restartOP)){
      reset()
    }
  }
  
  
  
  
  
  trex.collide(invisibleGround);
  
  
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY
  gameImage.visible = false
  restartOP.visible = false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  score = 0 
}

function spawnObstacles(){
  if(frameCount%100==0){
    obstacle = createSprite(600,height-95)
    obstacle.velocityX = -(4+3* score/300);
    obstacle.lifetime =200;
    obstacle.scale = 0.15;
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1 :
        obstacle.addImage(obstacle1)
        break;
      case 2 :
        obstacle.addImage(obstacle2)
        break;
      case 3 :
        obstacle.addImage(obstacle3)
        break;
      case 4 :
        obstacle.addImage(obstacle4)
        break;
      case 5 :
        obstacle.addImage(obstacle5)
        break;
      case 6 :
        obstacle.addImage(obstacle6)
        break;
    }
   
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  if(frameCount%100==0){
    cloud = createSprite(600,random(30,91),10,10)
    cloud.velocityX = -3
    cloud.addImage(cloudImage)
    cloud.scale = random(0.6 ,1.4)  
    cloud.depth = trex.depth -1   
    cloud.lifetime = 220 ;
   cloudsGroup.add(cloud);
  }
 
}
