//deklarera variabler
var c, ctx, bollX = 100, bollY = 100, bollVX = 1, bollVY = 2;
var leftPlY = 100, rightPlY = 200, leftPlVY = 0, rightPlVY = 0;

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

}

function keyDown(e){
    //knapptryck uppåt 38
    if(e.keyCode == 38){
        leftPlVY = -2;
    }
    if(e.keyCode == 40){
        leftPlVY = 2;
    }
    console.log(e.keyCode);
}