var tiles = [];
var brickImage;
var ball,ballImage;
var start,startImage;
var bouncer,bouncerImage;
var gameState = "start";
var edges;
var score = 0;
var life,lifeImg;
var lifeArr = [];

function preload(){
  brickImage = loadImage("images/tile1.png");
  startImage = loadImage("images/start.png");
  ballImage = loadImage("images/ball.png");
  bouncerImage = loadImage("images/paddle1.png");
  lifeImg = loadImage("Images/life.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  bouncer = createSprite(displayWidth/2,displayHeight/2+250,40,40);
  bouncer.addImage(bouncerImage);
  bouncer.scale = 0.5
  ball = createSprite(displayWidth/2,displayHeight/2+150,40,40);
  ball.addImage(ballImage);
  ball.scale = 0.4
  
  edges = createEdgeSprites();

  start = createSprite(displayWidth/2,displayHeight/2-50,40,40);
  start.addImage(startImage);
  for(var i = 150 ; i < displayWidth ; i=i+150){
    for(var o = 150;o<400;o=o+50){
      brick = createSprite(i,o,20,20)
      brick.addImage(brickImage);
      brick.scale = 0.2
      tiles.push(brick);
    }
  }
  for(var count = 1;count < 6; count++){ 
    life = createSprite(count*60, 40); 
    life.addImage(lifeImg); 
    life.scale = 0.4; 
    lifeArr.push(life); 
  }
}


function draw(){
  background("cyan");
  textSize(30);
  text("Score :" + score,1660,40);
  
  if(gameState === "start"){
    start.visible = true;
    if (mousePressedOver(start)){
      start.visible = false;
      ball.velocityX = -8;
      ball.velocityY = -9;
      gameState = "play";

      
    }
  }
  if(gameState === "play"){
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    ball.bounceOff(bouncer);
    
    playGame();
  }

  if(gameState === "over"){
    while(tiles.length > 0 ){
      var poper = tiles.pop();
      poper.destroy();
    }
    ball.visible = false;
    bouncer.visible = false;
    textSize(60);
    fill("red")
    text("GAME OVER!!",displayWidth/2,displayHeight/2);
  }
  
  drawSprites();
}

function playGame(){
  bouncer.x = mouseX;
  for(var i = 0;i<tiles.length;i =i+1){
    var br = tiles[i];
    if(br !== null && ball.isTouching(br)){
      ball.bounceOff(br);
      br.destroy();
      score = score+2
      break;
      
    }
  }
  if(ball.y > displayHeight){
    ball.x = displayWidth/2
    ball.y = displayHeight/2+150
    bouncer.x = displayWidth/2
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "start";
    var lostLife = lifeArr.pop();
    lostLife.destroy(); 
    if(lifeArr.length === 0){ 
      gameState = "over"; 
    }

  }
}