var PLAY=1;
var END=0;
var gameState

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage,cloudsGroup
var score;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup
var gameOver,over;
var gameRestart,restart;
var jumpSound,dieSound,checkPoint

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png")
 
  obstacle1=loadAnimation("obstacle1.png")
  obstacle2=loadAnimation("obstacle2.png")
  obstacle3=loadAnimation("obstacle3.png")
  obstacle4=loadAnimation("obstacle4.png")
  obstacle5=loadAnimation("obstacle5.png")
  obstacle6=loadAnimation("obstacle6.png")
 
  gameRestart=loadAnimation("restart.png")
  
  gameOver=loadAnimation("gameOver.png")
  
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkPoint=loadSound("checkPoint.mp3")
}

function setup() {

  createCanvas(600,200)
  
  score=0
  gameState=PLAY
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crete reastart
      restart=createSprite(300,140)
      restart.addAnimation("reset",gameRestart)
      restart.scale=0.5
      over=createSprite(300,80)
      over.addAnimation("over",gameOver)
      restart.visible=false
      over.visible=false
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstaclesGroup = new Group ();
  cloudsGroup = new Group();
  
  trex.debug=false
  trex.setCollider("circle",80,0,40)
}

function draw() {
  //set background color
  background("white");
  
  console.log(frameCount)
  
  
  if(gameState===PLAY){
      if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
        jumpSound.play()
      }
        trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      score=score+Math.round(getFrameRate()/60)
      
  //stop trex from falling down
      trex.collide(invisibleGround);
  //Spawn Clouds
    spawnClouds()
  
  //Spawn Obstacle
    spawnObstacle(); 
    
    if(score%100===0&&score>0){
    checkPoint.play()
    }
    
    ground.velocityX=-(6+score/100)
    
    
     if(trex.isTouching(obstaclesGroup)){
         gameState=END
        dieSound.play()
        
     }
  }
  else if(gameState===END) {
      ground.velocityX=0;
      trex.velocityY=0
      obstaclesGroup.setVelocityXEach(0)
      cloudsGroup.setVelocityXEach(0)
      cloudsGroup.setLifetimeEach(-1)
      obstaclesGroup.setLifetimeEach(-1)
      trex.changeAnimation("collided",trex_collided)
     restart.visible=true
    over.visible=true
      //over.scale=2
    
    }
  
  

  if(mousePressedOver(restart)){
     reset()
     }
  
  text("score"+score,500,50)
  

  

  
  drawSprites();
 }

//function to spawn the clouds
function spawnClouds(){
     
  if(frameCount%60===0){
     var cloud;
      cloud=createSprite(600,70)
      cloud.addAnimation("cloud",cloudImage)
      cloud.scale=0.5
      cloud.y=random(80,140)
      cloud.velocityX=-2
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloudsGroup.add(cloud)
     }
}

function spawnObstacle(){
if(frameCount%60===0){
   var obstacle
   obstacle=createSprite(600,160)
  var ran
  ran=Math.round(random(1,6))
  obstacle.velocityX=-(6+score/100)
  obstacle.scale=0.5
  obstacle.lifetime=300
  switch(ran){
    case 1: obstacle.addAnimation("obstacle",obstacle1)
      break;
    case 2: obstacle.addAnimation("obstacle",obstacle2)
      break;
    case 3: obstacle.addAnimation("obstacle",obstacle3)
      break;
    case 4: obstacle.addAnimation("obstacle",obstacle4)
      break;
    case 5: obstacle.addAnimation("obstacle",obstacle5)
      break;
    case 6: obstacle.addAnimation("obstacle",obstacle6)
      break;
    default:
  }
  obstaclesGroup.add(obstacle)
  }
   }
  
function reset(){
    over.visible=false
    restart.visible=false
    score=0
     obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    gameState= PLAY  
  trex.changeAnimation("running",trex_running)
    }
  





