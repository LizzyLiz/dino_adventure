window.onload = function () {
	alert("In this game, you will have to run away from the falling ice meteors. Press the left and right arrow keys to dodge them. If you get hit by too many meteors, you will lose. Please click 'Ok' to play.");
}

var canvas = document.getElementById('canvas');
var ctxBg = canvas.getContext('2d');

var rex = document.getElementById('rex');
var ctxRex = rex.getContext('2d');

var objects = document.getElementById('objects');
var ctxObjects = objects.getContext('2d');

var score = document.getElementById('score');
var ctxScore = score.getContext('2d');
ctxScore.fillStyle = "hsla(255, 255%, 255%, 0.5)";
ctxScore.font = "bold 50px Arial";

var player = new Rex();
var game_width = canvas.width;
var game_height = canvas.height;
var fps = 1;
var drawInterval;
var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;
var spawnInterval;
var totalEnemies = 0;
var enemies = [];
var spawnRate = 2000;
var spawnAmount = 1;
var score_num = 0;
var time=0;

var spriteBg = new Image();
spriteBg.src = 'pics/sprite_sheet_ice.png';
spriteBg.addEventListener('load',null,false);


var sprite_rex1 = new Image();
sprite_rex1.src = 'pics/sprite_sheet_ice.png';
sprite_rex1.addEventListener('load',null,false);

var sprite_rex1_back = new Image();
sprite_rex1_back.src = 'pics/sprite_sheet_ice.png';
sprite_rex1_back.addEventListener('load',null,false);

var sprite_metor = new Image();
sprite_metor.src = 'pics/sprite_sheet_ice.png';
sprite_metor.addEventListener('load',init,false);



function draw()
{
	time +=1;
	if (time <= 8000)//test for seconds
	{
		player.draw();
		drawAllEnemies();
		drawScore();
	}
	else
	{
		stopDrawing();
		if (score_num === 0)
			window.location = "http://localhost:4567/herb_choice_J2";
		else if (score_num > -45) 
			window.location = "http://localhost:4567/herb_choice_J";
		else
		{
			alert("You got hit by too many meteors, so you shall die!");
			window.location = "http://localhost:4567/death";
		}
	}
}

function startDrawing()
{
	drawInterval = setInterval(draw, fps);
}
function stopDrawing()
{
	clearInterval(drawInterval);

}

function init()
{
	startDrawing();
	startSpawningEnemies();
	drawBg();
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
}

function spawnEnemy(n) {
    for (var i = 0; i < n; i++) {
        enemies[totalEnemies] = new Objects();
        totalEnemies++;
    }
}

function drawAllEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        if (checkCollision(enemies[i]))
        	enemies[i].destroyObject;
    }
}
function startSpawningEnemies() {
     stopSpawningEnemies();
    spawnInterval = setInterval(function() {spawnEnemy(spawnAmount);}, spawnRate);
}

function stopSpawningEnemies() {
    clearInterval(spawnInterval);
}
function drawBg()
{
	var srcX = 0;//actual background
	var srcY = 0;
	var drawX = 0; //drawing the background
	var drawY = 0;
	ctxBg.drawImage(spriteBg,srcX+20,srcY+100,game_width,game_height,drawX,drawY,game_width,game_height);
}

function clearBg()
{
	ctxBg.clearRect(0,0, game_width, game_height);
}

function drawScore()
{
	ctxScore.clearRect(0,0, game_width, game_height);
	ctxScore.fillText("Score: "+ score_num ,700,50);
}

function Rex()
{
	this.srcX = 0; //actual background
	this.srcY = 0;
	this.drawX = 0; //drawing the background
	this.drawY = 540;
	this.width = 119;
	this.height = 95;
	this.speed = 2;
	this.isRightKey = false;
	this.isLeftKey = false;
}

Rex.prototype.draw = function() 
{
	clearRex();
	this.checkKeys();
	if (this.isRightKey)
		ctxRex.drawImage(sprite_rex1,this.srcX,this.srcY+780,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
	else
		ctxRex.drawImage(sprite_rex1,this.srcX,this.srcY+780,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
	if(this.isLeftKey)
		ctxRex.drawImage(sprite_rex1_back,this.srcX+178,this.srcY+780,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

function clearRex()
{
	ctxRex.clearRect(0,0, game_width, game_height);
}

Rex.prototype.checkKeys = function()
{
	if(this.isLeftKey && this.drawX>0) {
		this.drawX -= this.speed;
	}
	if(this.isRightKey && this.drawX<850) {
		this.drawX += this.speed;
	}
};

function checkKeyDown(e)
{
	var keyID = e.KeyCode || e.which;
	if (keyID == 37)//left key
	{
		player.isLeftKey = true;
		e.preventDefault();
	}
	if (keyID == 39)//left key
	{
		player.isRightKey = true;
		e.preventDefault();
	}
}

function checkKeyUp(e)
{
	var keyID = e.KeyCode || e.which;
	if (keyID == 37)//left key
	{
		player.isLeftKey = false;
		e.preventDefault();
	}
	if (keyID == 39)//left key
	{
		player.isRightKey = false;
		e.preventDefault();
	}
	
}

function Objects()
{
	this.srcX = 0; //actual background
	this.srcY = 0;
	this.drawX = Math.random()*game_width; //drawing the background
	this.drawY = 0;
	this.width = 15;
	this.height = 15;
	this.speed = 5;

}
Objects.prototype.draw = function() 
{
	clearObject();
	this.drawY += this.speed; //move by itself
	ctxObjects.drawImage(sprite_metor,this.srcX+364,this.srcY+819,this.width,this.height,this.drawX,this.drawY,this.width+30,this.height+20);
};
function clearObject()
{
	ctxObjects.clearRect(0,0, game_width, game_height);
}
Object.prototype.checkEscaped = function() {
    if (this.drawY <= -2000) {
        this.destroyObject();
    }
};

Object.prototype.destroyObject = function() {
    enemies.splice(enemies.indexOf(this), 1);
    totalEnemies --;
};

function updateScore()
{
	score_num -= .5;
}
function checkCollision(meteor)
{
	if (player.drawX < meteor.drawX && player.drawX+119 > meteor.drawX && player.drawY < meteor.drawY && player.drawY+95 > meteor.drawY) { 
		updateScore();
		return true;
	} else {
		return false;
	}
		
}

