/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var shrubsGroup;
var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
createCanvas(800, 400);

kangaroo = createSprite(50,200,20,50);
kangaroo.addAnimation("running", kangaroo_running);
kangaroo.addAnimation("collided", kangaroo_collided);
kangaroo.scale = 0.15;


jungle = createSprite(400,100,400,20);
jungle.addImage("jungle",jungleImage);
jungle.scale=0.3;
jungle.velocityX = -3;
  
shrubsGroup = new Group();
obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  if(gameState===PLAY){
    background(200);
    
    
    edges= createEdgeSprites();
    
    jungle.velocityX = -3;
    //code to reset the background
    if(jungle.x < 50){
      jungle.x = 400
    }
    if(keyDown("space")&& kangaroo.y>270) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8 
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    spawnShrub1();
    spawnShrub2();
    spawnShrub3();
    spawnobstacle();
  }
  else if (gameState === END) {
    //set velcity of each game object to 0
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    //change the trex animation
    kangaroo.changeAnimation("collided",kangaroo_collided);
    
  }
  
  drawSprites();

}

function spawnShrub1() {
if (World.frameCount % 350 == 0) {
var shrub = createSprite(Math.round(750,800), 300, 10, 10);
shrub.addImage(shrub1);
shrub.scale=0.05;
shrub.velocityX = -3;
shrub.lifetime = 300;
shrubsGroup.add(shrub);
}
}
function spawnShrub2() {
if (World.frameCount % 650 == 0) {
var shrub = createSprite(Math.round(750,800), 300, 10, 10);
shrub.addImage(shrub2);
shrub.scale=0.05;
shrub.velocityX = -3;
shrub.lifetime = 300;
shrubsGroup.add(shrub);
}
}
function spawnShrub3() {
if (World.frameCount % 450 == 0) {
var shrub = createSprite(Math.round(750,800), 300, 10, 10);
shrub.addImage(shrub3);
shrub.scale=0.05;
shrub.velocityX = -3;
shrub.lifetime = 300;
shrubsGroup.add(shrub);
}
}

function spawnobstacle() {
if (World.frameCount % 200 == 0) {
var rock = createSprite(Math.round(750,800), 300, 10, 10);
rock.addImage(obstacle1);
rock.scale=0.12;
rock.velocityX = -3;
rock.lifetime = 300;
obstaclesGroup.add(rock);
}
}
        
    


