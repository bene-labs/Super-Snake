
/*function setColor() {
   color  = "green" ? "red" : "green";
}
*/

// Module pattern
var drawModule = (function () { 
    var bodySnake = function(x, y) {
        // This is the single square
        color =(document.getElementById("color").value);
		ctx.fillStyle = color;
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // This is the border of the square
        borderColor =(document.getElementById("color2").value);
		ctx.strokeStyle = borderColor;
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var pizza = function(x, y) {
        // This is the border of the pizza
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // This is the single square 
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    }

    var scoreText = function() {
        // How many pizzas did the snake eat
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
    }
	
	var playerName = function() {
		var player_name = name + "'s snake";
		ctx.fillStyle = 'blue';
		ctx.fillText(player_name, 145, 10);
	}

     var drawSnake = function() {
        var length = 4;
        snake = [];
        
        // creates initial snake at the top left corner of the screen (facing right)
        for (var i = length; i >= 0; i--) {
            snake.push({x:i, y:0});
        }  
    }

    var createFood = function() {
          food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }
        
        // position of the snake's body.
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
             if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                 food.x = Math.floor((Math.random() * 30) + 1);
				 food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
        } 
        return false;
    }

    var paint = function () {
    // space in which the snake will move.
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

    // border.
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    //Disable the button _start_ 
    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    
    //Make the snake move.
    
    if (direction == 'right') {
        snakeX++;
    } else if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'down') {
        snakeY++;
    }

    //Game over
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
		 
		 console.log("Game over. Reseting speed to 10 fps"); 
		if (score == 0){
			alert("Game Over! You didn't get any points. Try again, " + name + "! (Pro Tip: Use the arrow keys to move)")
		}
	else if (score == highscore){
		alert("Game Over! You got a score of " + score + " and reached a speed of circa " + (Math.round(fps * 100) / 100) + " fps. A new highscore, great job " + name + "!");
		}
		
	else {
        alert("Game Over! You got a score of " + score + " and reached a speed of circa " + (Math.round(fps * 100) / 100) + " fps. Well played " + name );
		}
        //enable start button  
        btn.removeAttribute('disabled', true);
	
        //Clean up the canvas.
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;       
    }
	
    // eat food
    if (snakeX == food.x && snakeY == food.y) {
        //Creates a new square instead of moving the tail.
        var tail = {
            x: snakeX,
            y: snakeY
        };
		score++;
		createFood();
		
		if (speed > 40 && score < 100) {
			acceleration++;
			 speed =  speed - acceleration / 10;
			 gameloop = clearInterval(gameloop);
			 gameloop= setInterval(paint, speed);
			 fps = 1 / (speed/1000);
			console.log("You got a point. New score: " + score + "! Game speed is now: 1 frame every " + speed + " miliseconds ≈ " + (Math.round(fps * 1000) / 1000) +" fps");
        }
		else if (score == 100) {
			speed = 30;
			gameloop = clearInterval(gameloop);
			gameloop = setInterval(paint, speed);
            fps = 1 / (speed / 1000);
			console.log("You got a your 100th Point. You're Amazing! New max game speed unlocked. Your Game speed is now: 1 frame every 30 miliseconds = " + (Math.round(fps * 1000) / 1000) +" fps");
		}
		else {
			console.log("You got a point. New score: " + score + "! Max speed reached!");
		}    
    } 
	else {
        //Pops out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }
	
    if (score >= highscore){
        highscore = score;
        document.getElementById("h").innerHTML = "Highscore: " + highscore + " - " + name;
    }
    //Puts the tail as the first cell.
    snake.unshift(tail);

    //For each element of the array create a square using the bodySnake function 
    for (var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
    }

    //Creates food using the _pizza_ function.
    pizza(food.x, food.y);

    //Display the score text.
    scoreText();
	//Display the player's name
	name = (document.getElementById("name").value);
	playerName(name);
}

var init = function () {
    speed = 100;
	score = 0; 
	acceleration = 0;
	direction = 'down';
    drawSnake();
    createFood();
    gameloop = setInterval(paint, speed);
}
  return {
      init: init
  };
  
}());