var bg
var bottomGround, topGround
var turtle, turtleImg
var baby, babyImg
var obsShark, obsJellyfish, obsOctopus
var obsPuff, obsTrash
var gameOver, gameOverImg
var restart, restartImg
var backgroundImg
var win, winImg;
var score = 0;

     
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;


function preload(){
  bgImg = loadImage("assets/under the sea.jpg")

  turtleImg = loadImage("assets/turtle.png")
  babyImg = loadImage("assets/baby.png")
  
  obsShark = loadImage("assets/shark.png")
  obsJellyfish = loadImage("assets/jellyfish.png")
  obsOctopus = loadImage("assets/octopus.png")
  
  obsPuff = loadImage("assets/puff.png")
  obsTrash = loadImage("assets/trash.png")
  
  
  gameOverImg= loadImage("assets/fimdejogo.png")
  restartImg = loadImage("assets/restart.png")

  //jumpSound = loadSound("assets/jump.mp3");
  //dieSound = loadSound("assets/die.mp3");

  winImg = loadImage("assets/win.png")

}

function setup(){

createCanvas(windowWidth-14,windowHeight-20);
bg = createSprite(windowWidth/2,200);
bg.addImage("bg", bgImg);
bg.scale = 4.2;


bottomGround = createSprite(windowWidth/2,windowHeight,windowWidth ,50);
bottomGround.visible = false;

topGround = createSprite(windowWidth/2,0,windowWidth,10);
topGround.visible = false;
      
  
turtle = createSprite(windowWidth/4.5,windowHeight/2,20,50);
turtle.addImage("turtle",turtleImg);
turtle.debug = true;
turtle.scale =0.18;
turtle.setCollider("rectangle",0,-90,1000,500)

baby = createSprite (windowWidth + 20,windowHeight/2,20,50)
baby.addImage("baby", babyImg);
baby.visible = false;
baby.scale = 0.1



topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();


gameOver = createSprite(windowWidth/2,windowHeight/3);
restart = createSprite(windowWidth/2,windowHeight/1.8);
win = createSprite(windowWidth/2,windowHeight/3)
gameOver.addImage(gameOverImg);
gameOver.scale = 2;
restart.addImage(restartImg);
restart.scale = 0.8;
win.addImage(winImg);
gameOver.visible = false;
restart.visible = false;
win.visible = false;


}

function draw() {
  

  if(gameState === PLAY){

    if(score > 250){
    
    gameState = WIN;


}
    if(keyDown("space")) {
      turtle.velocityY = -15 ;
    }

    turtle.velocityY = turtle.velocityY + 2;

    //turtle.collide(bottomGround);
    //turtle.collide(topGround);

    Bar();

   
     spawnObstaclesTop();
     spawnObstaclesBottom();


if(topObstaclesGroup.isTouching(turtle) || bottomObstaclesGroup.isTouching(turtle)||
 bottomGround.isTouching(turtle)|| topGround.isTouching(turtle)){

gameState = END;


}




/*if(topObstaclesGroup.isTouching(turtle) || turtle.isTouching(topGround)){
  turtle.velocityY = 6 ;
}




if(turtle.isTouching(bottomGround) || bottomObstaclesGroup.isTouching(turtle)){
  turtle.velocityY = -6 ;
}*/

  }

  if(gameState === WIN){


      turtle.velocityX = 3
      turtle.y = windowHeight/2
      turtle.velocityY = 0
      topObstaclesGroup.setVelocityYEach(-2.2);
      bottomObstaclesGroup.setVelocityYEach(2.2);
      barGroup.setLifetimeEach(0);
      baby.visible = true;
      baby.velocityX = -6

      if(turtle.isTouching(baby)){
      win.visible = true
      win.depth = win.depth + 1
      baby.velocityX = 0;
      turtle.velocityX = 0;
      turtle.velocityY = 0;
      restart.visible = true;
      restart.depth = restart.depth+1
      }
    


  }

  

  if(gameState === END) 
    {

      gameOver.visible = true;
      gameOver.depth = gameOver.depth+1
      restart.visible = true;
      restart.depth = restart.depth+1
          
        
          turtle.velocityX = 0;
          turtle.velocityY = 0;
          topObstaclesGroup.setVelocityXEach(0);
          bottomObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);
          barGroup.destroyEach();
          
          
          topObstaclesGroup.setLifetimeEach(-1);
          bottomObstaclesGroup.setLifetimeEach(-1);
          
         
          
          
          if(mousePressedOver(restart)) 
          {
                reset();
          }

    } 

    drawSprites();
    Score();     
  }

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  turtle.y=windowHeight/2

  score = 0;
}


function spawnObstaclesTop() 
{
  if(World.frameCount % 70 === 0) {
    obstacleTop = createSprite(windowWidth-10,500,40,50);

obstacleTop.scale = 0.1;
obstacleTop.velocityX = -16 
obstacleTop.debug = true;



obstacleTop.y = Math.round(random(320,windowHeight - 600));


var rand = Math.round(random(1,4));
switch(rand) {
  case 1: obstacleTop.addImage(obsShark);
          obstacleTop.scale=0.6
          obstacleTop.setCollider("rectangle",0,0,950,250)
          break;
  case 2: obstacleTop.addImage(obsJellyfish);
          obstacleTop.scale=0.5
          obstacleTop.setCollider("rectangle",0,-20,500,500)
          
          break;
  case 3: obstacleTop.addImage(obsOctopus);
          obstacleTop.scale=0.45
          obstacleTop.setCollider("rectangle",-200,0,600,500)
          break;        
  case 4: obstacleTop.addImage(obsPuff);
          obstacleTop.scale = 0.2
          obstacleTop.setCollider("rectangle",0,0,750,500)
          break;       
  default: break;
}


obstacleTop.lifetime = windowWidth + 50;

turtle.depth = turtle.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

function spawnObstaclesBottom() 
{
  if(World.frameCount % 70 === 0) {
    obstacleBottom = createSprite(windowWidth-10,windowHeight-150,40,50);

obstacleBottom.addImage(obsTrash);
//obstacleBottom.debug=true
obstacleBottom.y = Math.round(random(windowHeight-130,550));


obstacleBottom.scale = 0.1;
obstacleBottom.velocityX = -16;




var rand = Math.round(random(1,4));
switch(rand) {
  case 1: obstacleBottom.addImage(obsShark);
          obstacleBottom.scale=0.6
          obstacleBottom.setCollider("rectangle",0,0,950,250)
          break;

  case 2: obstacleBottom.addImage(obsTrash);
          obstacleBottom.setCollider("rectangle",0,0,3000,1100)
          break;

  case 3: obstacleBottom.addImage(obsPuff);
          obstacleBottom.scale = 0.2
          obstacleBottom.setCollider("rectangle",0,0,750,500)
          break;

  case 4: obstacleBottom.addImage(obsJellyfish);
          obstacleBottom.scale=0.5
          obstacleBottom.setCollider("rectangle",0,-20,500,500)
          break;

  default: break;
}


obstacleBottom.lifetime = windowWidth + 50;

turtle.depth = turtle.depth + 1;

bottomObstaclesGroup.add(obstacleBottom);

  }
}

 function Bar() 
 {
         if(World.frameCount % 70 === 0)
         {
          var bar = createSprite(windowWidth-20,windowHeight/2,10,windowHeight);
          bar.velocityX = -16

        
          bar.velocityX = -16
          bar.depth = turtle.depth;
          bar.lifetime = windowWidth;

          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(turtle.isTouching(barGroup))
         {
           score = score + 1;
    
         }

        textFont("algerian");
        textSize(120);
        fill("white");
        text(score, windowWidth/2 + 20, 150);
       
  
}

//usando chamadas de API para definir a imagem de plano de fundo de acordo com o tempo
/*async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0o6 && hour<=19){
    
    bg.addImage(bgImg);
    bg.scale = 1.3
  }
  else{
    
    bg.addImage(bgImg2);
    bg.scale = 1.5
    bg.x=200
    bg.y=200
  }

}*/
