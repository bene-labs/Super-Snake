    var mycanvas = document.getElementById('canvas');
    var ctx = mycanvas.getContext('2d');
    var w = 350;
    var h = 350;
    var score = 0;
    var highscore = 0;
    var snake;
    var snakeSize = 10;
    var food;
	var speed = 100;
	var acceleration = 0;
	var fps = 10;
	var name;
	var color;
	var borderColor;