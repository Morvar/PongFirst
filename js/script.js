//deklarera variabler
var c, ctx, bollX = 200, bollY = 150;
var initAng = 0.4, initSpd = 2, initDrc = 1;
var angle = initAng, speed = initSpd, direc = initDrc, speedChange = 0.2;
var leftPlY = 100, rightPlY = 200, leftPlVY = 0, rightPlVY = 0;
var leftPlScore = 0, rightPlScore = 0, leftPlScoreOld = 0, rightPlScoreOld = 0;
/* 
Bollens rörelse är en funktion av fart, vinkel
och riktning upp/ner.
*/
function bollVX(speed1, angle1, direc1){
   
    return angle1 * speed1;
   
}

function bollVY(speed1, angle1, direc1){
    
    if(angle1 < 0){
        return (-1 - angle1)* speed1 * direc1; }
    else if(angle1 > 0){
        return (1 - angle1) * speed1 * direc1;}
    else{
        return speed1 * direc1;}
}

console.log('x ' + bollVX(speed, angle, direc));
console.log('y ' + bollVY(speed, angle, direc));
//______________________
var songNum = Math.floor((Math.random() * 4));
console.log(songNum);
if(songNum == 0){
    var bgSound = new Howl({
        urls: ['sounds/sandstorm.mp3'], loop:true
        }).play();
}

else if(songNum == 1){
    var bgSound = new Howl({
        urls: ['sounds/rct2modernstyle.mp3'], loop:true
        }).play();
}

else if(songNum == 2){
    var bgSound = new Howl({
        urls: ['sounds/rct2technostyle.mp3'], loop:true
        }).play();
}
else if(songNum == 3){
    var bgSound = new Howl({
        urls: ['sounds/gourmetracen64.mp3'], loop:true
        }).play();
}


var bounceSound = new Howl({
  urls: ['sounds/sound2.mp3']
});
var scoreSound = new Howl({
  urls: ['sounds/sound3.mp3']
});
var scoreSound2 = new Howl({
  urls: ['sounds/sound4.mp3']
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
    bollX = bollX + bollVX(speed,angle,direc);
    bollY = bollY + bollVY(speed,angle,direc);

    //Flytta spelare
    leftPlY = leftPlY + leftPlVY;
    rightPlY = rightPlY + rightPlVY;
    
    // Studs i nederkant
    if (bollY > 300) {
        direc = -direc;
        bollY = 300;
        speed = speed + speedChange;
        bounceSound.play();
    }

    // Studs i överkant
    if (bollY < 0) {
        direc = -direc;
        bollY = 0;
        speed = speed + speedChange;
        bounceSound.play();
    }
    
    //studs mot spelare left
    if(bollX > 10 && bollX < 30 && bollY > leftPlY && bollY < leftPlY + 50){
        bollX = 30;
        direc = -direc;
        speed = speed + speedChange;
        angle = Math.random()*0.65 + 0.25
        //angle = -angle;
        console.log('v ' + angle);
        bounceSound.play();
    }
    //studs mot spelare right
    if(bollX > 370 && bollX < 390 && bollY > rightPlY && bollY < rightPlY + 50){
        bollX = 370;
        direc = -direc;
        speed = speed + speedChange;
        angle = -(Math.random()*0.65 + 0.25)
        //angle = -angle;
        console.log('v ' + angle);
        bounceSound.play();
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
    
    //poängräkning och bollkontroll
    if(bollX < 0){
        rightPlScore ++;
        speed = initSpd; document.getElementById("rightPlScore").innerHTML = "Right player: " + rightPlScore;
        bollX = 200;
        scoreSound.play();
    }
    if(bollX > 400){
        leftPlScore ++;
        speed = initSpd; document.getElementById("leftPlScore").innerHTML = "Left player: " + leftPlScore;
        bollX = 200;
        scoreSound.play();
    }
    scoreCheck();

}

function scoreCheck(){
    if(leftPlScore % 10 == 0 && leftPlScoreOld % 10 != 0){
        scoreSound2.play();
    }
    leftPlScoreOld = leftPlScore;
    
    if(rightPlScore % 10 == 0 && rightPlScoreOld % 10 != 0){
        scoreSound2.play();
    }
    rightPlScoreOld = rightPlScore;
}


//funktionen som behandlar alla knapptryckningar
function keyDown(e){
    //vänster knapptryck uppåt w
    if(e.keyCode == 87){
        leftPlVY = -4;
    }
    //vänster neråt s
    if(e.keyCode == 83){
        leftPlVY = 4;
    }
    //höger uppåt up
    if(e.keyCode == 38){
        rightPlVY = -4;
    }
    //höger neråt down
    if(e.keyCode == 40){
        rightPlVY = 4;
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
