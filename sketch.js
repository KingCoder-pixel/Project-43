var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  bananaImg = loadImage("images/banana.png");
  obstacleImg = loadImage("images/stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-10;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group()
  obstaclesGroup = new Group()
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    
    spawnFood()
    spawnObstacles()
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  if(FoodGroup.isTouching(player))
  {
    FoodGroup.destroyEach();
    score = score + 2;
    player.scale += 0.01
    
  }

  

  drawSprites();
  fill("white")
  textSize(20)
  text("Score: " + score, 600, 50)
  if(obstaclesGroup.isTouching(player))
  {
    gameState = END
  }
  if(gameState === END)
{
  backgr.velocityX = 0
  player.visible = false

  FoodGroup.destroyEach()
  obstaclesGroup.destroyEach();
  textSize(40)
  fill(random(0, 255))
  text("Game Over!", 400, 200)
}
}

function spawnFood()
{
  if(frameCount % 90 === 0)
  {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg)
    banana.scale = 0.05;
    banana.velocityX = -4;
   
    banana.lifetime = 300;
    player.depth = banana.depth+1;
    FoodGroup.add(banana)
  }
}

function spawnObstacles()
{
  if(frameCount % 60 === 0)
  {
    var obstacle = createSprite(600, 320, 40, 10);
    obstacle.y = random(200, 400);
    obstacle.scale = 0.12;
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImg)
    obstacle.lifetime = 300;
    player.depth = obstacle.depth+1;
    obstaclesGroup.add(obstacle)
  }
}
