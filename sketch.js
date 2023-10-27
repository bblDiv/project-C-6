
var PLAY=1;
var END=0;
var gameState=PLAY;

var jump_sound;
var die_sound;
var checkpoint_sound;

var score=0;

var cloudsGroup;
var obstaclesGroup;

var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_dead = loadImage("trex_collided.png");
  groundImg = loadImage("ground2.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  cloudImg=loadImage("cloud.png");
  jump_sound=loadSound("jump.mp3");
  die_sound=loadSound("die.mp3");
  checkpoint_sound=loadSound("checkpoint.mp3");
  restartImg=loadImage("restart.png");
  gameoverImg=loadImage("gameOver.png");

}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(20,175);
 trex.addAnimation("trex",trex_running);
 trex.addAnimation("trex_dead",trex_dead);

restart = createSprite(300,120);
restart.addImage(restartImg);
restart.scale=0.25;
gameover = createSprite(300,100);
gameover.addImage(gameoverImg);
gameover.scale=0.25;

 trex.scale=0.4;

  ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImg);
//ground.scale=0.5;


invisG=createSprite(200,195,400,20);
invisG.visible=false;

cloudsGroup = createGroup();
obstaclesGroup = createGroup();

}

function draw(){
  background("white");

  text("score: "+ score, 25, 20 );

  text(mouseX+","+mouseY,mouseX,mouseY);

  console.log(trex.y);


  if(gameState===PLAY){
    ground.velocityX=-6;

    restart.visible=false;
    gameover.visible=false;

    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(keyDown("space") && trex.y>=165){
      trex.velocityY=-8;
      jump_sound.play()
    }


    trex.velocityY+=0.41;

    score=score+Math.round(frameCount/60);


    if(score>0 && score%500===0){
      checkpoint_sound.play()
    }
    
    cloudF()
    cacti()
    

    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
      die_sound.play()
    }
  
  
  }

  else if(gameState===END){
    ground.velocityX=0;
    trex.velocityY=0;

    restart.visible=true;
    gameover.visible=true;

    obstaclesGroup.setVelocityXEach(0);

    cloudsGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);

    cloudsGroup.setLifetimeEach(-1);

    trex.changeAnimation("trex_dead",trex_dead);

    if(mousePressedOver(restart)){
      reset()
    }
  }

  trex.collide(invisG);



  drawSprites();
}

function cloudF(){
  if(frameCount%120===0){
  
  cloud=createSprite(565,30,10,10);
  cloud.velocityX=-4;
  cloud.addImage("cloudImg",cloudImg);
  cloud.scale=0.5;
  cloud.y=Math.round(random(10,90));
 cloud.lifetime=143;
 cloudsGroup.add(cloud);
}
}

function cacti(){
  if(frameCount%100===0){

    obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-6;
    obstacle.scale=0.55;
    obstacle.lifetime=150;
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default: break;
    }
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  trex.changeAnimation("trex",trex_running);
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();



}