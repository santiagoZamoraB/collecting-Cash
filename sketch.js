var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States

var gameState;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,windowHeight);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(200,windowHeight,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,200);

gameState = "Start"
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === "Start"){
    boy.x = 200;
    boy.y = windowHeight / 2 + 350;
    treasureCollection=0;
    
    if(keyDown("space")){
      gameState = "PLAY";
    }
  }
  
     
  if(gameState==="PLAY"){

  
    
  boy.x = World.mouseX;
  path.velocityY = 4;

  
  
  //code to reset the background
  if(path.y > windowHeight ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (boy.isTouching(cashG,removeCash)) {
      
      treasureCollection=treasureCollection+50;
    }
    else if (boy.isTouching(diamondsG,removeDiamonds)) {
      treasureCollection=treasureCollection+100;
      
    }else if(boy.isTouching(jwelleryG,removeJ)){
      treasureCollection=treasureCollection+75;
      
    }
      if(swordGroup.isTouching(boy)) {
      gameState = "END";
      swordGroup.destroyEach();
      
    }
  
  
  

  }
  
  if(gameState === "END"){
    restart();
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
  if(keyDown("space")){
    gameState = "Start";
    boy.play();
    
  }
    
    
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,50,30);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = windowHeight + 50;
  cashG.add(cash);
  }
}

function removeCash(sprite,cashG){
  cashG.remove();
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = windowHeight + 50;
  diamondsG.add(diamonds);
}
}

function removeDiamonds(sprite,diamondsG){
  diamondsG.remove();
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = windowHeight + 50;
  jwelleryG.add(jwellery);
  }
}

function removeJ(sprite,jewelleryG){
  jewelleryG.remove();
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = windowHeight + 50;
  swordGroup.add(sword);
  }
}
function restart(){
  boy.pause();
  path.velocityY = 0;
  swordGroup.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  cashG.setVelocityYEach(0);
  jwelleryG.setLifetimeEach(-1);
  diamondsG.setLifetimeEach(-1);
  cashG.setLifetimeEach(-1);
  swordGroup.setLifetimeEach(-1);
}