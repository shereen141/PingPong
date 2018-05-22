var speed = 5;
var max = 0;
function setSpeed(n){
	n = int(n);
	
	speed = 5;
	if (n == 0)
		speed = 3;
	if (n == 1)
		speed = 6;
	if (n == 2)
		speed = 9;
	return speed;
}

function initialize(){
	paddle = document.getElementById('paddle');
	ball = document.getElementById('ball');
	court = document.getElementById('court');
	dx = dy = speed;
	score = 0;
	//height = generateHeight();
	
	x = 1;
	y=-80;
	
	ball.style.left = x+"px";
	ball.style.top = y+"px";

}



function generateHeight() {
	var height = Math.floor((Math.random()*500)-80);
	
	if (court.offsetTop<height && court.offsetTop+height < 500)
		return height;
	else generateHeight();
}

function startGame() {
	court.onmousemove = movePaddle;
	gameState = setInterval(playGame,10);
}

function movePaddle(event){
	var mouseY = (event.clientY - (court.offsetTop - document.documentElement.scrollTop));
	if (mouseY > (court.offsetHeight - paddle.offsetHeight))
		mouseY = (court.offsetHeight - paddle.offsetHeight);

	if (mouseY < (court.offsetTop  - paddle.offsetTop -130))
		mouseY = court.offsetTop  - paddle.offsetTop-130;
	
	paddle.style.top = mouseY + "px";
}

function playGame(){
	x = x + dx;
	y = y + dy;
	
	ball.style.left = x+"px";
	ball.style.top = y+"px";

	if(x < 0)
		dx = -dx;

	if (( (court.offsetHeight -80)< (y + ball.offsetHeight)) || (y < -80) ) {
		dy = -dy;
	}

	if ((x + ball.offsetWidth) > court.offsetWidth) {
		clearInterval(gameState);
		if (max < score) {
			max = score;
		}

		initialize();
		document.getElementById("score").innerHTML = max;
		document.getElementById("messages").innerHTML = "You Lost!!!";

	}

	
	if((x + ball.offsetWidth) > paddle.offsetLeft){
      if((y < (paddle.offsetTop + paddle.offsetHeight -80))&& ((y + ball.offsetHeight) > paddle.offsetTop -80)){
         dx = -dx;
         score += 1;
         document.getElementById("strikes").innerHTML = score;
      }
    }

}



function resetGame() {
	clearInterval(gameState);
	initialize();
}