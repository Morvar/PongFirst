//deklarera variabler
var c, ctx, bollX = 100, bollY = 100, bollVX = -1, bollVY = 2;
var leftPlY = 100, rightPlY = 200, leftPlVY = 0, rightPlVY = 0;

//skaffa canvas
function init () {
    c = document.getElementById("duk");
    ctx = c.getContext("2d");

    //Kör update var 20e ms
    window.setInterval(update, 20);
}

function update(){

    //Sudda canvas
    ctx.clearRect(0, 0, c.width, c.height);
    
    //Måla boll
    ctx.beginPath();
    ctx.arc(bollX, bollY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    
    //Måla paddlar
    ctx.fillRect(10, leftPlY, 20, 50);
    ctx.fillRect(370, rightPlY, 20, 50);

    // Flytta boll
    bollX = bollX + bollVX;
    bollY = bollY + bollVY;

    //Flytta spelare
    leftPlY = leftPlY + leftPlVY;
    rightPlY = rightPlY + rightPlVY;
    // Studs i nederkant
    if (bollY > 300) {
        bollVY = -bollVY;
        bollY = 300;
    }

    // Studs i överkant
    if (bollY < 0) {
        bollVY = -bollVY;
        bollY = 0;
    }
    //studs mot spelare left
    if(bollX > 10 && bollX < 30 && bollY > leftPlY && bollY < leftPlY + 50){
        bollVX = bollVX * (-1);
    }
    //studs mot spelare right
    if(bollX > 370 && bollX < 390 && bollY > rightPlY && bollY < rightPlY + 50){
        bollVX = bollVX * (-1);
    }
    
    //hindra rutorna från att fly
    if(leftPlY < -25){
    leftPlVY = 0;
    leftPlY = -25;
    }
    if(leftPlY > 275){
    leftPlVY = 0;
    leftPlY = 275;
    }
    if(rightPlY < -25){
    rightPlVY = 0;
    rightPlY = -25;
    }
    if(rightPlY > 275){
    rightPlVY = 0;
    rightPlY = 275;
    }
    

}
//funktionen som behandlar alla knapptryckningar
object.onkeypress = function keyPress(e){
    //vänster knapptryck uppåt w
    if(e.keyCode == 87){
        leftPlVY = -2;
    }
    
    //vänster neråt s
    else if(e.keyCode == 83){
        leftPlVY = 2;
    }
    else{
        leftPlVY = 0;
    }
    //höger uppåt up
    if(e.keyCode == 38){
        rightPlVY = -2;
    }
    //höger neråt down
    else if(e.keyCode == 40){
        rightPlVY = 2;
    }
    else{
        rightPlVY = 0;
    }
    
    //kolla keyID
    console.log(e.keyCode);
}
