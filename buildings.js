// buildings

function building(x, y, dimX, dimY, type, tile) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.imageURL = "assets/greenbuilding.png";
    this.type = type;
    this.buildingCost = 0;
    this.price = 0;
    this.tile = tile;
    this.ticker = 0;
    this.tickerMax = 0;
    this.popStorage = 0;
    this.maxPopStorage = 0;
    this.buildingLevel = 1;
    this.usageCost = 0;
    this.textRenderTime = 30;
    this.textRenderTicker = 0;
    this.textRender = true;
    this.requirePower = false;
    this.powerCost = 0;


    if (this.type == "green") {
        this.buildingCost = 50;
        this.price = 100;
        this.tickerMax = 120;
        this.usageCost = 2;
        this.powerCost = 5;
        this.requirePower = true;
    } else if (this.type == "blue") {
        this.buildingCost = 50;
        this.price = 100;
        this.tickerMax = 60;
        this.maxPopStorage = 25 * this.buildingLevel;
        this.usageCost = this.popStorage;
        this.requirePower = false;
    } else if (this.type == "grey") {
        this.price = 50;
        this.buildingCost = 50;
        this.tickerMax = 120;
        this.usageCost = 5;
        this.requirePower = false;
    } else if(this.type == "dark_green") {
        this.price = 500;
        this.buildingCost = 100;
        this.tickerMax = 0;
        this.usageCost = 0;
        this.requirePower = false;
    } else if(this.type == "purple") {
        this.price = 500;
        this.buildingCost = 100;
        this.tickerMax = 0;
        this.usageCost = 0;
        this.requirePower = false;
    } else if(this.type == "pink") {
        this.price = 500;
        this.buildingCost = 100;
        this.tickerMax = 30;
        this.usageCost = 2;
        this.requirePower = true;
    }

    this.render = function(x, y, index, alpha) {

        y -= (dimY / 2 * index);

        x = x - camera.x;
        y = y - camera.y;
       

        if (type == "green") {
            context.fillStyle = "rgb(30, 200, 30," + alpha.toString() + ")";
        } else if(type == "blue") {
            context.fillStyle = "rgb(30, 30, 200," + alpha.toString() + ")";
        } else if(type == "grey") {
            context.fillStyle = "rgb(25, 25, 25," + alpha.toString() + ")";
        } else if(type == "dark_green") {
            context.fillStyle = "rgb(25, 175, 25," + alpha.toString() + ")";
        } else if(type == "purple") {
            context.fillStyle = "rgb(175, 25, 175," + alpha.toString() + ")";
        } else if(type == "pink") {
            context.fillStyle = "rgb(229, 103, 210," + alpha.toString() + ")";
        } else if(type == "gold") {
            context.fillStyle = "rgb(212,175,55," + alpha.toString() + ")";
        } else if(type == "red") {
            context.fillStyle = "rgb(255,0,0," + alpha.toString() + ")";
        }

        


        if (this.tile.active) {
            context.strokeStyle = "rgba(0,0,0" + alpha.toString() + ")";
        }
        
        context.beginPath();

        context.moveTo(x + dimX / 2, y + dimY / 2 + this.height);
        context.lineTo(x, y + dimY + this.height);
        context.lineTo(x - dimX / 2, y + dimY / 2 + this.height);
        context.lineTo(x - dimX / 2, y + dimY / 2 + (this.height * 2));
        context.lineTo(x, y + dimY + (this.height * 2));
        context.lineTo(x, y + dimY + this.height);
       // context.lineTo(x + dimX / 2, y + dimY / 2 + (this.height * 2));

        context.closePath();
        context.fill();
        if (this.tile.active) {
            context.stroke();
        }

        //right face

        if (type == "green") {
            context.fillStyle = "rgb(30, 225, 30," + alpha.toString() + ")";
        } else if(type == "blue") {
            context.fillStyle = "rgb(30, 30, 225," + alpha.toString() + ")";
        } else if(type == "grey") {
            context.fillStyle = "rgb(45, 45, 45," + alpha.toString() + ")";
        } else if(type == "dark_green") {
            context.fillStyle = "rgb(25, 75, 25," + alpha.toString() + ")";
        } else if(type == "purple") {
            context.fillStyle = "rgb(100, 25, 100," + alpha.toString() + ")";
        } else if(type == "pink") {
            context.fillStyle = "rgb(198, 53, 177," + alpha.toString() + ")";
        } else if(type == "gold") {
            context.fillStyle = "rgb(168, 137, 38," + alpha.toString() + ")";
        } else if(type == "red") {
            context.fillStyle = "rgb(108, 20, 20," + alpha.toString() + ")";
        }

        context.beginPath();

        context.moveTo(x + dimX / 2, y + dimY / 2 + this.height);
        context.lineTo(x, y + dimY + this.height);
        context.lineTo(x, y + dimY + (this.height * 2));
       // context.lineTo(x, y + dimY + this.height);
        context.lineTo(x + dimX / 2, y + dimY / 2 + (this.height * 2));
       // context.lineTo(x + dimX / 2, y + dimY / 2 + (this.height * 2));

        context.closePath();
        context.fill();
        if (this.tile.active) {
            context.stroke();
        }

        if (type == "green") {
            context.fillStyle = "rgb(0, 255, 0," + alpha.toString() + ")";
        } else if(type == "blue") {
            context.fillStyle = "rgb(0, 0, 255," + alpha.toString() + ")";
        } else if(type == "grey") {
            context.fillStyle = "rgb(50, 50, 50," + alpha.toString() + ")";
        } else if(type == "dark_green") {
            context.fillStyle = "rgb(25, 125, 25," + alpha.toString() + ")";
        } else if(type == "purple") {
            context.fillStyle = "rgb(125, 25, 125," + alpha.toString() + ")";
        } else if(type == "pink") {
            context.fillStyle = "rgb(244, 66, 217," + alpha.toString() + ")";
        } else if(type == "gold") {
            context.fillStyle = "rgb(247, 210, 91, " + alpha.toString() + ")";
        } else if(type == "red") {
            context.fillStyle = "rgb(168, 20, 20," + alpha.toString() + ")";
        }

        

        context.beginPath();

        //draw top square

        context.moveTo(x, y + this.height);
        context.lineTo(x + dimX / 2, y + dimY / 2 + this.height );
        context.lineTo(x, y + dimY + this.height);
        context.lineTo(x - dimX / 2, y + dimY / 2 + this.height);

        context.closePath();
        context.fill();
        if (this.tile.active) {
            context.stroke();
        }



        //RENDERING PROGRESS BAR

        if (tile.active) {
            if (this.tickerMax > 0) {

                let offsetX = 68;
                let offsetY = 70;

                context.fillStyle = "rgb(60,60,60)";
                context.fillRect(x + offsetX, y + offsetY, 100 / 2, 10);

                if (this.type == "blue") {
                        context.fillStyle = "rgb(30,200,30)";
                        context.fillRect(x + offsetX, y + offsetY, (this.popStorage / this.maxPopStorage) * 100 / 2, 10);
                    
                } else {
                    context.fillStyle = "rgb(30,200,30)";
                    context.fillRect(x + offsetX, y + offsetY, (this.ticker / this.tickerMax) * 100 / 2, 10);
                }
    
                
    
              //  context.strokeStyle = "rgba(255,255,255" + alpha.toString() + ")";
               // context.rect(x + offsetX, y + offsetY, 100 / 2, 10);
               // context.stroke();
            }

            if (this.textRender) {

                if (this.type == "blue" || this.type == "green" || this.type == "grey" || this.type == "pink") {
                    let text = "";
                    if (this.type == "blue") {
                        context.fillStyle = "rgb(0, 0, 255)";
                        if (this.popStorage < this.maxPopStorage && food > 0) {
                            text = "+ Pop";
                        }
                        
                    } else if(this.type == "green") {
                        context.fillStyle = "rgb(0, 255, 0)";
                        text = "+ Food";
                    } else if(this.type == "grey") {
                        context.fillStyle = "rgb(255, 255, 255)";
                        text = "+ Materials";
                    } else if(this.type == "pink") {
                        context.fillStyle = "rgb(244, 66, 217)";
                        text = "+ Power";
                    } else {
                        context.fillStyle = "rgb(0, 0, 0)";
                    }
                    console.log("Should be rendering text!");
                    context.font = "12px Arial";
                    context.fillText(text, x + 72, y + 64 - 10 - this.textRenderTicker);

                    if (this.textRenderTicker < this.textRenderTime) {
                        this.textRenderTicker++;
                    } else {
                        this.textRender = false;
                        this.textRenderTicker = 0;
                    }

                }
            }
            
        }


    }

}


