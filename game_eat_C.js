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
var time = 0;

var spriteBg = new Image();
spriteBg.src = 'pics/sprite_sheet_cave.png';
spriteBg.addEventListener('load',init,false);

var sprite_rex1 = new Image();
sprite_rex1.src = 'pics/sprite_sheet_cave.png';
sprite_rex1.addEventListener('load',init,false);

var sprite_rex2 = new Image();
sprite_rex2.src = 'pics/sprite_sheet_cave.png';
sprite_rex2.addEventListener('load',init,false);

var sprite_metor = new Image();
sprite_metor.src = 'pics/sprite_sheet_cave.png';
sprite_metor.addEventListener('load',init,false);


function draw()
{
	time +=1;
	console.log(time);
	if (time <= 20000)//test for seconds
	{
		player.draw();
		drawAllEnemies();
		drawScore();
	}
	else
		stopDrawing();
		

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
    clearObject();
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
	ctxBg.drawImage(spriteBg,srcX,srcY,game_width,game_height,drawX,drawY,game_width,game_height+200);
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
	this.srcX = 0;//actual background
	this.srcY = 0;
	this.drawX = 0; //drawing the background
	this.drawY = 0;
	this.width = 162;
	this.height = 90;
	this.speed = .7;
	this.isDownKey = false;
	this.isUpKey = false;
}

Rex.prototype.draw = function() 
{
	clearRex();
	this.checkKeys();
	if (this.isDownKey)
		ctxRex.drawImage(sprite_rex1,this.srcX,this.srcY+544,this.width,this.height,this.drawX+100,this.drawY,this.width,this.height);
	else if(this.isUpKey)
		ctxRex.drawImage(sprite_rex2,this.srcX+209,this.srcY+544,this.width,this.height,this.drawX+100,this.drawY,this.width,this.height);
	else
		ctxRex.drawImage(sprite_rex1,this.srcX,this.srcY+544,this.width,this.height,this.drawX+100,this.drawY,this.width,this.height);
};

function clearRex()
{
	ctxRex.clearRect(0,0, game_width, game_height);
}

Rex.prototype.checkKeys = function()
{
	if(this.isUpKey && this.drawY>10) {
		this.drawY -= this.speed;
	}
	if(this.isDownKey && this.drawY<535) {
		this.drawY += this.speed;
	}
};

function checkKeyDown(e)
{
	var keyID = e.KeyCode || e.which;
	if (keyID == 38)//up key
	{
		player.isUpKey = true;
		e.preventDefault();
	}
	if (keyID == 40)//down key
	{
		player.isDownKey = true;
		e.preventDefault();
	}
}

function checkKeyUp(e)
{
	var keyID = e.KeyCode || e.which;
	if (keyID == 38)//left key
	{
		player.isUpKey = false;
		e.preventDefault();
	}
	if (keyID == 40)//left key
	{
		player.isDownKey = false;
		e.preventDefault();
	}
	
}
function Objects()
{
	this.srcX = 0;//actual background
	this.srcY = 0;
	this.drawX = 900; //drawing the background
	this.drawY = Math.random()*500;
	this.width = 20;
	this.height = 28;
	this.speed = 2;

}
Objects.prototype.draw = function() 
{
	clearObject();
	 this.drawX -= this.speed//move by itself
	 ctxObjects.drawImage(sprite_metor,this.srcX+412,this.srcY+604,this.width,this.height,this.drawX,this.drawY,this.width+30,this.height+10);
};
function clearObject()
{
	ctxObjects.clearRect(0,0, game_width, game_height);
}
Object.prototype.checkEscaped = function() {
    if (this.drawX <= -2000) {
        this.destroyObject();
    }
};

Object.prototype.destroyObject = function() {
    enemies.splice(enemies.indexOf(this), 1);
    totalEnemies--;
};

function updateScore()
{
	score_num ++;
}
function checkCollision(meteor)
{
	if (player.drawX < meteor.drawX && player.drawX+150 > meteor.drawX && player.drawY < meteor.drawY && player.drawY+90 > meteor.drawY) { 
		console.log("I'm in the thing")
		updateScore();
		return true;
	} else {
		return false;
	}
		
}