//deklarera variabler
var c, ctx, bollX = 200, bollY = 150, bollVX = -1, bollVY = 2;
var leftPlY = 100, rightPlY = 200, leftPlVY = 0, rightPlVY = 0;
var leftPlScore = 0, rightPlScore = 0;
var bgSound = new Howl({
  urls: ['sounds/sound1.mp3'], loop:true
}).play();
var bounceSound = new Howl({
  urls: ['sounds/sound2.mp3']
});

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
    /*
    //Måla mittlinje
    ctx.beginPath();
    ctx.moveTo(200,0);
    ctx.lineTo(200,300);
    ctx.strokeStyle = "lightblue"
    ctx.lineWidth = 2;
    ctx.stroke();
    */
    //Måla boll
    ctx.beginPath();
    ctx.arc(bollX, bollY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fill();
    ctx.closePath();
    
    //Måla paddlar
    ctx.fillStyle = "rgb(255,128,0)"
    ctx.fillRect(10, leftPlY, 20, 50);
    ctx.fillStyle = "rgb(204,0,102)"
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
    
    //poängräkning
    if(bollX < 0){
        rightPlScore ++;
        document.getElementById("rightPlScore").innerHTML = "Right player: " + rightPlScore;
        bollX = 200;
    }
    if(bollX > 400){
        leftPlScore ++;
        document.getElementById("leftPlScore").innerHTML = "Left player: " + leftPlScore;
        bollX = 200;
    }

}
//funktionen som behandlar alla knapptryckningar
function keyDown(e){
    //vänster knapptryck uppåt w
    if(e.keyCode == 87){
        leftPlVY = -2;
    }
    //vänster neråt s
    if(e.keyCode == 83){
        leftPlVY = 2;
    }
    //höger uppåt up
    if(e.keyCode == 38){
        rightPlVY = -2;
    }
    //höger neråt down
    if(e.keyCode == 40){
        rightPlVY = 2;
    }
}

//funktionen som behandlar alla knappsläppningar 
function keyUp(e){
    //vänster knapptryck uppåt w
    if(e.keyCode == 87){
        leftPlVY = 0;
    }
    //vänster neråt s
    if(e.keyCode == 83){
        leftPlVY = 0;
    }
    //höger uppåt up
    if(e.keyCode == 38){
        rightPlVY = 0;
    }
    //höger neråt down
    if(e.keyCode == 40){
        rightPlVY = 0;
    }
}
//kolla keyID
//console.log(e.keyCode);