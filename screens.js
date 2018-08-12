var screens = [];

var levelLoaded = false;

var offsetX = 0;
var offsetY = 0;

var gameScreen = {
    id : 1,
    type : "Game",
    width: 13,
    height: 13,
    tileDimensionX: 128,
    tileDimensionY: 64,
    tiles: []
}

function Tile(x, y, dimX, dimY, empty, r) {
    this.row = r;
    this.x = x;
    this.y = y;
    this.dimX = dimX;
    this.dimY = dimY;
    this.buildings = [];
    this.hovered = false;
    this.resources = 1000;
    this.empty = empty;
    this.buildingLimit = 10;
    this.alpha = 1.0;
    this.powered = false;
    this.active = true;

    this.setAlpha = function() {
        if (!this.active) {
            this.alpha = 0.1;
        } else {
            this.alpha = 1.0;
        }
    }
}

gameScreen.swapArray = function(one, two) {
    let temp = this.tiles[one];
    this.tiles[one] = this.tiles[two];
    this.tiles[two] = temp;
}

gameScreen.resize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('resized');
}

gameScreen.generateTiles = function() {
    for (let x=1;x<=this.width;x++) {
        for (let y=1;y<=this.height;y++) {
            if (x >= 5 && x <= 9 && y >= 5 && y <= 9) {
                this.tiles.push(new Tile((x * this.tileDimensionX) - (x * this.tileDimensionX / 2) + (y * this.tileDimensionX / 2),
                 (y * this.tileDimensionY) - (x * this.tileDimensionY / 2) - (y * this.tileDimensionY / 2), this.tileDimensionX, this.tileDimensionY, false, y));
            } else {
                this.tiles.push(new Tile((x * this.tileDimensionX) - (x * this.tileDimensionX / 2) + (y * this.tileDimensionX / 2),
                 (y * this.tileDimensionY) - (x * this.tileDimensionY / 2) - (y * this.tileDimensionY / 2), this.tileDimensionX, this.tileDimensionY, true, y));
            }
        }
    }

    //sort tiles array into render

    for (let t=0;t<this.tiles.length-1;t++) {

        for (let j=0;j<this.tiles.length-1-t;j++) {
            if (this.tiles[j].y < this.tiles[j+1].y) {
                this.swapArray(j, j+1);
            } else if(this.tiles[j].y == this.tiles[j+1].y) {
                if (this.tiles[j].x > this.tiles[j+1].x) {
                    this.swapArray(j, j+1);
                }
            }
        }
    }

    levelLoaded = true;
}

gameScreen.renderGrid = function() {
    for (let t=0;t<this.tiles.length;t++) {
        // if (!this.tiles[t].empty) {
            if (this.tiles[t].active) {
                renderGrid(this.tiles[t]);
            }
             
             
         //}
 
     }
}

gameScreen.setRowActive = function(r) {

    console.log("ROW: " + r)

    for (let t=0;t<this.tiles.length;t++) {
        console.log("Rows: " + this.tiles[t].row);
        if (this.tiles[t].row == r) {
            this.tiles[t].active = true;
        } else {
            this.tiles[t].active = false;
        }
        this.tiles[t].setAlpha();
    }
}

gameScreen.setAllActive = function() {
    for (let t=0;t<this.tiles.length;t++) {
        this.tiles[t].active = true;
        this.tiles[t].setAlpha();
    }
}

gameScreen.render = function() {
    //render tiles
    for (let t=0;t<this.tiles.length;t++) {
       // if (!this.tiles[t].empty) {
            renderTile(this.tiles[t], this.tiles[t].alpha);
            
        //}

    }

    let pp = 0;
    let ps = 0;

    for (let t=this.tiles.length-1;t>=0;t--) {
        if (this.tiles[t].empty == false) {
            for (let b=0;b<this.tiles[t].buildings.length;b++) {
                
                this.tiles[t].buildings[b].render(this.tiles[t].x + offsetX, this.tiles[t].y - this.tiles[t].dimY + offsetY, b, this.tiles[t].alpha);

                if (this.tiles[t].buildings[b].ticker >= this.tiles[t].buildings[b].tickerMax) {
                    this.tiles[t].ticker = 0;
                    if (this.tiles[t].buildings[b].type == "blue") {
                        if (this.tiles[t].buildings[b].popStorage < this.tiles[t].buildings[b].maxPopStorage &&
                        food > 0) {
                            this.tiles[t].buildings[b].popStorage += 1;
                        } 

                        if (food < 0 && this.tiles[t].buildings[b].popStorage > 0) {
                            this.tiles[t].buildings[b].popStorage -= 1;
                        }
                        
                    } else if (this.tiles[t].buildings[b].type == "green") {

                        if (b > 0 && this.tiles[t].buildings[b + 1] != undefined) {
                            if (this.tiles[t].buildings[b-1].type == "dark_green" ||
                                this.tiles[t].buildings[b+1].type == "dark_green") {
                                    if (food < foodStorage && power > 0) {
                                        food += 4;
                                    }
                                   
                                } else {
                                    if (food < foodStorage && power > 0) {
                                        food += 2;
                                    }
                                }
                        } else {
                            if (this.tiles[t].buildings[b+1] != undefined) {
                                if (this.tiles[t].buildings[b+1].type == "dark_green") {
                                    if (food < foodStorage && power > 0) {
                                        food += 4;
                                    }
                                }
                            } else {
                                if (food < foodStorage && power > 0) {
                                    food += 2;
                                }
                            }
                        }

                        if (power > 0) {
                            power -= this.tiles[t].buildings[b].powerCost;
                        }
                        


                    } else if (this.tiles[t].buildings[b].type == "grey") {

                        resources += 25;
                        this.tiles[t].resources -= 25;

                        if (this.tiles[t].resources <= 0) {
                            this.tiles[t].empty = true;
                        }

                    } else if (this.tiles[t].buildings[b].type == "pink") {
                        if (power < powerStorage) {
                            power += 2;
                        }
                    }

                    this.tiles[t].buildings[b].ticker = 0;
                    this.tiles[t].buildings[b].textRender = true;
                } 



                if (this.tiles[t].buildings[b].type == "blue") {
                    pp += this.tiles[t].buildings[b].popStorage;
                }

                this.tiles[t].buildings[b].ticker++;

            }
        }
        
    }

    population = pp;

    //render buildings

    
}

gameScreen.getTiles = function() {
    return this.tiles;
}

gameScreen.checkTiles = function(type, mx, my) {

    //mx = mx - offsetX;
   // my = my - offsetY;

    


    if (type == "hover") {
        let hovering = false;
        for (let t=0;t<this.tiles.length;t++) {

            let tileX = this.tiles[t].x - camera.x;// + this.tiles[t].dimX / 2 - camera.x;
            let tileY = this.tiles[t].y + this.tiles[t].dimY / 2 - camera.y;

            let sel_x = getSelWidth(my, tileY, this.tiles[t].dimX); 
            let sel_y = getSelHeight(mx, tileX, this.tiles[t].dimY);

            if (mx > tileX - sel_x / 2 && mx < tileX + sel_x / 2 &&
            my > tileY - sel_y / 2 && my < tileY + sel_y / 2) {
                this.tiles[t].hovered = true;
                hovering = true;
                if (!this.tiles[t].empty && this.tiles[t].active) {
                    showGrid = true;
                } else {
                    if (buildingSelected != "brown") {
                        showGrid = false;
                    }
                    
                }
            } else {
                this.tiles[t].hovered = false;
            }
 
        }

        if (my >= canvas.height - 100) {
            hovering = true;
        }
        if (!hovering) {
            document.getElementById("canvas").style.cursor = "default";
        } else {
            document.getElementById("canvas").style.cursor = "pointer";
        }
    } else {
        for (let t=0;t<this.tiles.length;t++) {

            if (this.tiles[t].active && buildingSelected != "brown" && my < canvas.height - 100) {

                let tileX = this.tiles[t].x - camera.x;// + this.tiles[t].dimX / 2 - camera.x;
                let tileY = this.tiles[t].y + this.tiles[t].dimY / 2 - camera.y;
    
                let sel_x = getSelWidth(my, tileY, this.tiles[t].dimX); 
                let sel_y = getSelHeight(mx, tileX, this.tiles[t].dimY);
    
                if (mx > tileX - sel_x / 2 && mx < tileX + sel_x / 2 &&
                my > tileY - sel_y / 2 && my < tileY + sel_y / 2) {
               // this.tiles[t].buildings.push(new greenBuilding(this.tiles[t].x + offsetX, this.tiles[t].y + offsetY, 
                 //   this.tiles[t].tileDimensionX, this.tiles[t].tileDimensionY));

                // if (buildingSelected == "green") {
                    if (this.tiles[t].empty == false) {
                        if (resources - getCostByType(buildingSelected) >= 0 && currency - getPriceByType(buildingSelected) >= 0) {
                            if (buildingSelected == "grey" || buildingSelected == "purple" || buildingSelected == "gold") {
                                if (this.tiles[t].buildings.length < 1) {
                                    this.tiles[t].buildings.push(new building(40, 40, 128, 64, buildingSelected, this.tiles[t]));
                                    resources -= getCostByType(buildingSelected);
                                    currency -= getPriceByType(buildingSelected);
                                    addType(buildingSelected);
                                    if (buildingSelected == "purple") {
                                        this.tiles[t].powered = true;
                                        powerStorage += 200;
                                    } else if(buildingSelected == "gold") {
                                        currencyStorage += 2000;
                                    }
                                }
                            } else {
                                if (this.tiles[t].buildings.length < this.tiles[t].buildingLimit || buildingSelected == "red") {

                                    if (buildingSelected == "green" || buildingSelected == "pink") {
                                        if (this.tiles[t].powered) {
                                            this.tiles[t].buildings.push(new building(40, 40, 128, 64, buildingSelected, this.tiles[t]));
                                            resources -= getCostByType(buildingSelected);
                                            currency -= getPriceByType(buildingSelected);
                                            addType(buildingSelected);
                                        }
                                    } else {
                                        this.tiles[t].buildings.push(new building(40, 40, 128, 64, buildingSelected, this.tiles[t]));
                                        resources -= getCostByType(buildingSelected);
                                        currency -= getPriceByType(buildingSelected);
                                        addType(buildingSelected);

                                        if (buildingSelected == "dark_green") {
                                            foodStorage += 200;
                                        } else if(buildingSelected == "red") {
                                            this.tiles[t].buildingLimit += 10;
                                        } 
                                    }
                                    
                                }
                                
                            }
                            
                            this.setRowActive(this.tiles[t].row);
                            allActive = false;
                            break;
                        }

                        

                    } else {
                        this.setRowActive(this.tiles[t].row);
                        allActive = false;
                        console.log("hey what a wonderful kind of day");

                        
                    }
                    
                    
                // } else {
                    //this.tiles[t].buildings.push(new building(40, 40, 128, 64, buildingSelected));
                // }
                 
                

                    //40, 40, 128, 64
                
                }
            } else {
                if (this.tiles[t].empty && my < canvas.height - 100) {
                    if (mx >= (this.tiles[t].x - this.tiles[t].dimX / 2) - camera.x && mx <= this.tiles[t].x + this.tiles[t].dimX / 2 - camera.x &&
                my >= this.tiles[t].y - camera.y && my <= (this.tiles[t].y + this.tiles[t].dimY) - camera.y) {
                    this.setRowActive(this.tiles[t].row);
                    if (buildingSelected == "brown") {
                        if (resources - getCostByType(buildingSelected) >= 0 && currency - getPriceByType(buildingSelected) >= 0) {
                            this.tiles[t].empty = false;
                            allActive = true;
                            showGrid = true;
                            resources -= getCostByType(buildingSelected);
                            currency -= getPriceByType(buildingSelected);
                        }
                    }
                }
            }
            }
        
            
            let blength = this.tiles[t].buildings.length;
            console.log("LENGTH: " + blength);
            
        }
    }

}

function getCostByType(type) {
    if (type == "green") {
        return greenCost;
    } else if(type == "blue") {
        return blueCost;
    } else if(type == "grey") {
        return greyCost;
    } else if(type == "dark_green") {
        return darkGreenCost;
    } else if(type == "purple") {
        return purpleCost;
    } else if(type == "pink") {
        return pinkCost;
    } else if(type == "gold") {
        return goldCost;
    } else if(type == "red") {
        return redCost;
    } else if(type == "brown") {
        return brownCost;
    }
}

function getPriceByType(type) {
    if (type == "green") {
        return greenPrice;
    } else if(type == "blue") {
        return bluePrice;
    } else if(type == "grey") {
        return greyPrice;
    } else if(type == "dark_green") {
        return darkGreenPrice;
    } else if(type == "purple") {
        return purplePrice;
    } else if(type == "pink") {
        return pinkPrice;
    } else if(type == "gold") {
        return goldPrice;
    } else if(type == "red") {
        return redPrice;
     } else if(type == "brown") {
        return brownPrice;
     }
}

function addType(type) {
    if (type == "green") {
        greenCount += 1;
    } else if(type == "blue") {
        blueCount += 1;
    } else if(type == "grey") {
       greyCount += 1;
    } else if(type == "dark_green") {
        darkGreenCount += 1;
     } else if(type == "purple") {
        purpleCount += 1;
     } else if(type == "pink") {
        pinkCount += 1;
     } else if(type == "gold") {
        goldCount += 1;
     } else if(type == "red") {
        redCount += 1;
     }
}

gameScreen.checkUI = function(mx, my) {
    if (my >= canvas.height - 100) {
        canvas.style.cursor = "pointer";
        if (mx >= 0 && mx < 1 * buttonWidth) {
            buildingSelected = "green";
            infoX = 0; 
        } else if (mx >= 1 * buttonWidth && mx < 2 * buttonWidth) {
            buildingSelected = "blue";
            infoX = 1;
        } else if (mx >= 2 * buttonWidth && mx < 3 * buttonWidth) {
            buildingSelected = "grey";
            infoX = 2;
        } else if (mx >= 3 * buttonWidth && mx < 4 * buttonWidth) {
            buildingSelected = "dark_green";
            infoX = 3;
        } else if (mx >= 4 * buttonWidth && mx < 5 * buttonWidth) {
            buildingSelected = "purple";
            infoX = 4;
        } else if (mx >= 5 * buttonWidth && mx < 6 * buttonWidth) {
            buildingSelected = "pink";
            infoX = 5;
        } else if (mx >= 6 * buttonWidth && mx < 7 * buttonWidth) {
            buildingSelected = "gold";
            infoX = 6;
        } else if (mx >= 7 * buttonWidth && mx < 8 * buttonWidth) {
            buildingSelected = "red";
            infoX = 7;
        } else if (mx >= 8 * buttonWidth && mx < 9 * buttonWidth) {
            buildingSelected = "brown";
            infoX = 8;
            console.log("ayyy!");
            showGrid = true;
        }
    } else if (my <= 100) {
        if (mx >= canvas.width - 128) {
            this.setAllActive();
        } else if (mx >= canvas.width - 196 &&
        mx <= canvas.width - 128) {
            let music = document.getElementById("music");
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        }
    }
    
}

screens.push(gameScreen);

function getScreenById(ident) {
    for (let s=0;s<screens.length;s++) {
        if (screens[s].id == ident) {
            return screens[s];
        }
    }
}

function returnLevelLoaded() {
    return levelLoaded;
}

function getSelWidth(my, y, width){
    let sel_width = 0;
    let n=0;
    if (my > y){
        n = my - y;
    }
    else{
        n = y - my;
    }

    return width - n;
}

function getSelHeight(mx, x, height){
    let sel_height = 0;
    let n=0;
    if (mx > x){
        n = mx - x;
    }
    else{
        n = x - mx;
    }

    return height - n;
}
