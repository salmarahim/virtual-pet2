//Create variables here
var dog,dogimg, happyDog,happyDog, database, foodS, foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg.png");
  dogimg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();

  foodObj=new Food();

  dog=createSprite(850,190,10,10);
  dog.addImage("d",happyDog);
  dog.addImage("happy",dogimg);
  dog.scale=0.25;
  
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 background(46, 139, 87);
 foodObj.display();
 
  drawSprites();
  //add styles here
 fedTime=database.ref("FeedTime");
 fedTime.on("value",(data)=>{
   lastFed=data.val();
 })
textSize(20);
fill("white");
stroke("black");
//text("press up arrow to feed the dog",150,50);
if(foodS!==undefined)
text("foodStock: "+foodS,200,100);
text(mouseX+","+mouseY,mouseX,mouseY)
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+lastFed +"AM",350,30);
}
}




function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodS);
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
function feedDog(){
  dog.changeImage("happy",dogimg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}