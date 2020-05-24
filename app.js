(function (window, document, drawModule, undefined) {

    //Connect the button in the html with the _init_ function.
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
        drawModule.init();
    });

    document.onkeydown = function (event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) { //handles snake movement

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            //console.log('left');
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
				//console.log('right');
            }
            break;

        case 38:
            if (direction != 'down') {
                direction = 'up';
                //console.log('up');
            }
            break;

        case 40:
            if (direction != 'up') {
                direction = 'down';
                //console.log('down');
            }
            break;
        
        default:
            break;
        }
    }
})(window, document, drawModule);