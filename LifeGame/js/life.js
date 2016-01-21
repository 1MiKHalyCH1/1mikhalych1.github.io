var num = 10;
var matrix = [];
var matrixNew = [];

var width = 0; 
var height = 0;

var delay = 10;
var timer;
var isTimerOn = false;

function init() {
    var canvas = document.getElementById("life");
    canvas.width = canvas.height = 500; 
	var context = canvas.getContext("2d");
    
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        newRect(canvas, mousePos);
      }, false);
    
    widthAndHeightReset(canvas);
    fieldDrawing(canvas);
    matrixInit();
}

function fieldDrawing(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#FFF";
    for (var i = 0; i <= num; i++)
    {
        context.moveTo(i * width, 0);
        context.lineTo(i * width, canvas.height);
        
        context.moveTo(0, i * height);
        context.lineTo(canvas.width,i * height);
    }
    context.stroke();
}

function matrixInit() {
    for (var i = 0; i < num; i++)
    {
        matrix[i] = [];
        matrixNew[i] = [];
        for (var j = 0; j < num; j++)
        {
            matrix[i][j] = false;
            matrixNew[i][j] = false;
        }
    }
}

function widthAndHeightReset(canvas){
    width = canvas.width / num; 
    height = canvas.height / num;
}

function next_step() {
    var canvas = document.getElementById("life");
    var context = canvas.getContext("2d");
    mainMech();
    draw(canvas);
}

function cleaning() {
    var canvas = document.getElementById("life");
    var context = canvas.getContext("2d");
    stop();
    matrixInit();
    draw(canvas);
}

function draw(canvas) {
    var context = canvas.getContext("2d");
    for (var i = 0; i < num; i++)
        for (var j = 0; j < num; j++)
        {
            drawRect(canvas,i,j);
        }
}

function drawRect(canvas, x, y) {
    var context = canvas.getContext("2d");
    context.fillStyle = "#FFF";
    if (matrix[x][y])
        context.fillRect(x*width+1,y*height+1,
                           width-2, height-2);
    else
        context.clearRect(x*width+1,y*height+1,
                           width-2, height-2);
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function newRect(canvas,mousePos) {
    var context = canvas.getContext("2d");
    var x = Math.floor(mousePos.x/width);
    var y = Math.floor(mousePos.y/height);
    matrix[x][y] = !matrix[x][y];
    drawRect(canvas, x, y);
}

function mainMech() {
    for (var i =  0; i < num; i++)
        for (var j = 0; j < num; j++)
        {
            var localX = i - 1;
            var localY = j - 1;
            matrixNew[i][j] = liveOrDie(localX, localY);
        }
    
    for (var i = 0; i < num; i++)
        for (var j = 0; j < num; j++)
            matrix[i][j] = matrixNew[i][j];
}
    
function liveOrDie(x,y) {
    var counter = 0;
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (matrix[realValue(x+i)][realValue(y+j)]) counter++;
    if (matrix[x+1][y+1]) counter--;
    return (counter == 3 || (matrix[x+1][y+1] && counter == 2));
}

function realValue(value) {
    if (value == -1)
        return num - 1;
    if (value == num)
        return 0; 
    return value
}

function fieldPlus(){
    var canvas = document.getElementById("life");
    if (num != 70)
        num+=10;
    stop();
    matrixInit();
    widthAndHeightReset(canvas);
    fieldDrawing(canvas);
    draw(canvas);
}

function fieldMinus(){
    var canvas = document.getElementById("life");
    if (num != 10)
        num-=10;
    stop();
    matrixInit();
    widthAndHeightReset(canvas);
    fieldDrawing(canvas);
    draw(canvas);
}

function start(){
    if (!isTimerOn){
        function startTimer() {
            next_step();
        }
        timer = setInterval(startTimer, delay);
        isTimerOn = true;
    }
}

function stop(){
    if (isTimerOn){
        clearInterval(timer);
        isTimerOn = false;
    }
}

function speedUp(){
    if (delay != 10)
        delay-=10;
    stop();
    start();
}

function speedDown(){
    if (delay != 200)
        delay+=10;
    stop();
    start();
}
