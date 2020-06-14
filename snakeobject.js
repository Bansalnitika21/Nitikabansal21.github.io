function init()
{
canvas= document.getElementById('mycanvas');
W=H=canvas.width=canvas.height=1000;
pen= canvas.getContext('2d');
cs= 68;
score= 5;
food_img = new Image();
food_img.src = "pineapple.JPG";
trophy= new Image();
trophy.src="trophy.JPG";
food= getRandomFood();
game_over=false;
snake={
init_lenght: 5,
color:"red",
cells:[],
direction:"right",
speed:1,

createSnake: function(){
for(var i=this.init_lenght;i>0;i--)
{
    this.cells.push({x:i,y:0});

}
},
drawSnake: function(){
    for(var i=0;i<this.cells.length;i++)
        {
            pen.fillStyle= this.color;
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);

        }


},

updateSnake: function()
{
    var headx= this.cells[0].x;
var heady= this.cells[0].y;
    if(headx==food.x && heady==food.y)
        {
            food=getRandomFood();
            score++;}
            else{
this.cells.pop();
        }

var nextX,nextY;

if(this.direction=="right")
 {
     nextX= headx+ 1;
     nextY=heady;
 }
 else if(this.direction=="left")
 {
 nextX= headx-1;
 nextY=heady;
 }
 else if(this.direction=="down")
 {
     nextX= headx;
     nextY= heady+1;
 }
 else
    {nextX=headx;
    nextY=heady-1;}
 this.cells.unshift({x:nextX,y:nextY});
if(  this.cells[0].y> H/cs ||this.cells[0].x>W/cs ||this.cells[0].x<0 ||  this.cells[0].y<0  )
//(this.cells[0].y> H/cs-1 ||this.cells[0].x>W/cs-1 ||this.cells[0].x<1 ||  this.cells[0].y<0)
    //before game over snake will be 1 block away from boundary
    {
        //down most||rightmost||leftmost||upmost
        game_over=true;//correct||half correct||correct||1block

    }//y>H/cs||x>W/cs||x<0||y<0 then snake will loose one box after game over and before game over snake will hit the boundary with face
}

};

snake.createSnake();

function keyPressed(e)
{
    if(e.key=="ArrowRight")
    {
        snake.direction="right";
    }
else if(e.key=="ArrowLeft"){

    snake.direction="left";
}
    else if(e.key=="ArrowDown")
    {
        snake.direction="down";
    }
    else{

        snake.direction="up";
    }
    console.log(snake.direction);
}
document.addEventListener('keydown',keyPressed);
}
function draw()
{


    pen.clearRect(0,0,W,H);
snake.drawSnake();
pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,18,20,cs,cs);
pen.fillStyle="blue";
pen.font="25px";
pen.fillText(score,50,50);
}
function update()
{
snake.updateSnake();

}
function getRandomFood()
{
 var foodX= Math.round(Math.random()*(W-cs)/cs);
 var foodY= Math.round(Math.random()*(H-cs)/cs);
 var food={
  x: foodX,
  y: foodY,
  color:"aqua",
 }
 return food;

}
function gameloop(){
  if(game_over==true)
  {
      clearInterval(f);
      alert("game_over")
  }
draw();
update();

}
init();
var f= setInterval(gameloop,100);
