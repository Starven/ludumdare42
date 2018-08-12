var FPS = 60;

var currentScreen = 1; //1 is going to be game I guess I dunno
var screen = {};

var mx = 0;
var my = 0;

var clicked = false;
var UITab = 0;
var buildingSelected = "green";

var greenCount = 0;
var darkGreenCount = 0;
var blueCount = 0;
var greyCount = 0;
var purpleCount = 0;
var pinkCount = 0;
var goldCount = 0;
var redCount = 0;

var foodStorage = 0;

var greenCost = 50;
var darkGreenCost = 100;
var blueCost = 50;
var greyCost = 50;
var purpleCost = 200;
var pinkCost = 100;
var goldCost = 200;
var redCost = 400;
var brownCost = 500;

var greenPrice = 100;
var greyPrice = 50;
var bluePrice = 50;
var darkGreenPrice = 300;
var purplePrice = 300;
var pinkPrice = 200;
var goldPrice = 300;
var redPrice = 500;
var brownPrice = 500;

var ticker = 0;
var tickMax = 60;

var materialsTicker = 0;
var materialsTickerMax = 120;

var dayTicker = 0;
var dayLength = 1440;

var population = 0;
var food = 500;
var foodStorage = 500;
var resources = 500;
var power = 0;
var powerStorage = 0;
var currency = 1000;
var currencyStorage = 1000;

var cameraMoveX = "none";
var cameraMoveY = "none";

var cameraSpeed = 5;

var showGrid = false;
var allActive = true;

var buttonWidth = 0;
var infoX = 0;

var gameStart = false;

function startGame() {
    let menu = document.getElementById("menu");
    menu.classList.add("hidden");
    gameStart = true;
    let music = document.getElementById("music");
    music.play();
}

screen = getScreenById(currentScreen);

window.addEventListener("resize", function(e) {
    screen.resize();
})

window.onload = function () { window.focus(); } 
window.onclick = function () { window.focus(); }

document.addEventListener("keydown", function(e) {
  //  e.preventDefault();

    if (gameStart) {
        if (e.key == "d" || e.key == "ArrowRight") {
            cameraMoveX = "right";
        } else if (e.key == "a" || e.key == "ArrowLeft") {
            cameraMoveX = "left";
        } else {
            cameraMoveX = "none";
        }
    
        if (e.key == "w" || e.key == "ArrowUp") {
            cameraMoveY = "up";
        } else if (e.key == "s" || e.key == "ArrowDown") {
            cameraMoveY = "down";
        } else {
            cameraMoveY = "none";
        }
    
        if (e.key == "r") {
            allActive = true;
            screen.setAllActive();
            console.log("reset");
        }
    }
    
})

document.addEventListener("keyup", function(e) {
    e.preventDefault();

    if (gameStart) {
        if (e.key == "w" || e.key == "ArrowUp" || e.key == "s" || e.key == "ArrowDown") {
            cameraMoveY = "none"
        }
    
        if (e.key == "a" || e.key == "ArrowLeft" || e.key == "d" || e.key == "ArrowRight") {
            cameraMoveX = "none"
        }
    }

    
})

document.addEventListener("mousemove", function(e) {
    e.preventDefault();

    if (gameStart) {
        let rect = canvas.getBoundingClientRect();

        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    
        screen.checkTiles("hover", mx, my);
    }

   
});

document.addEventListener("mousedown", function(e) {
    e.preventDefault();

    if (gameStart) {
        let rect = canvas.getBoundingClientRect();

        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    
        if (!clicked) {
            screen.checkTiles("add", mx, my);
            screen.checkUI(mx, my);
            clicked = true;
        } 
    }

    

})

document.addEventListener("mouseup", function(e) {
    if (clicked) {
        clicked = false;
    }
})


//GAME LOOP HERE

window.setInterval(function() {

    if (gameStart) {
        if (!levelLoaded) {
            screen.generateTiles();
        } else {
    
            reRender();
            screen.render();
            renderUI(0);
            if (showGrid) {
                screen.renderGrid();
            }
            
    
        }
    
        if (dayTicker < dayLength) {
            dayTicker++;
        } else {
            food -= population;
            dayTicker = 0;
            let tiles = screen.getTiles();
    
            for (let t=0;t<tiles.length;t++) {
    
                for (let b=0;b<tiles[t].buildings.length;b++) {
                    if (tiles[t].buildings[b].type == "blue") {
                        if (currency < currencyStorage) {
                            currency += 2 * tiles[t].buildings[b].popStorage;//tiles[t].buildings[b].usageCost;
                            if (currency > currencyStorage) {
                                currency = currencyStorage;
                            }
                        }
                       
                    } else {
                        currency -= tiles[t].buildings[b].usageCost;
                    }
                   
                    console.log("OH IT COSTS IT COSTS");
                }
            }
        }
    
        //move camera here
    
        if (cameraMoveX == "right") {
            camera.x += cameraSpeed;
        } else if (cameraMoveX == "left") {
            camera.x -= cameraSpeed;
        } else {
            camera.x += 0;
        }
    
        if (cameraMoveY == "up") {
            camera.y -= cameraSpeed;
        } else if (cameraMoveY == "down") {
            camera.y += cameraSpeed;
        } else {
            camera.y += 0;
        }
    
        //population effects ticker
    
    
    
       // let gb = new greenBuilding(40, 40, 128, 64);
        //gb.render(100, 100);
    
        // input
    
        
    }

    


}, 1000 / FPS);