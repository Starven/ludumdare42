var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var camera = {
    x: 200,
    y: -400
}

function reRender() {
    context.fillStyle = "rgb(25,25,40)";
    context.fillRect(0,0,canvas.width, canvas.height);
}

function renderTile(tile, alpha) {

    //let rowpush = (y - 1);

    if (!tile.empty) {

        let x = tile.x - camera.x;
        let y = tile.y - camera.y;
        let dimX = tile.dimX;
        let dimY = tile.dimY;
        let hover = tile.hovered;
    
        let offset = 0;
        let offsetY = 0;
        x = x + offset
        y = y + offsetY;

    
    
        if (hover) {
            context.fillStyle = "rgb(86, 76, 65," + alpha.toString() + ")";
        } else {
            context.fillStyle = "rgb(168, 84, 33," + alpha.toString() + ")";
        }
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + dimX / 2, y + dimY / 2 );
        context.lineTo(x, y + dimY);
        context.lineTo(x - dimX / 2, y + dimY / 2);
        context.closePath();
        context.fill();


    } else {
        
        if (tile.buildings.length > 0) {
            renderGrid(tile);
            console.log("Tile is Empty");
            for (let b=0;b<tile.buildings.length;b++) {
                if (tile.buildings[b].type == "green") {
                    greenCount -= 1;
                } else if(tile.buildings[b].type == "blue") {
                    blueCount -= 1; //CHANGE THIS WHEN
                } else if(tile.buildings[b].type == "grey") {
                    greyCount -= 1;
                }
                tile.buildings.splice(b, 1);
                
            }
        }
    }

    

}

function renderGrid(tile) {

    let x = tile.x - camera.x;
    let y = tile.y - camera.y;
    let dimX = tile.dimX;
    let dimY = tile.dimY;
    let hover = tile.hovered;

    let offset = 0;
    let offsetY = 0;
    x = x + offset
    y = y + offsetY;


    context.strokeStyle = "rgba(20,20,200, 0.2)";

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + dimX / 2, y + dimY / 2 );
    context.lineTo(x, y + dimY);
    context.lineTo(x - dimX / 2, y + dimY / 2);
    context.closePath();
    context.stroke();

    if (tile.hovered) {
        context.fillStyle = "rgba(20,20,255, 0.5)";

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + dimX / 2, y + dimY / 2 );
        context.lineTo(x, y + dimY);
        context.lineTo(x - dimX / 2, y + dimY / 2);
        context.closePath();
        context.fill();
    }
    

}

function renderUI(tab) {

    //render resource panel

    context.textAlign = "left";

    context.fillStyle = "rgb(175, 175, 175)";
    context.fillRect(0, 0, canvas.width, 32);

    //POPULATION

    context.fillStyle = "rgb(0,0,255)";
    context.fillRect(0,0,128,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Population: " + population.toString() + "/" + (blueCount * 25).toString(), 12, 20);


    //FOOD

    context.fillStyle = "rgb(0,255,0)";
    context.fillRect(128,0,128,32);

    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "12px Arial";
    context.fillText("Food: " + food.toString() + "/" + foodStorage.toString(), 128 + 12, 20);

    //BUILDING RESOURCES

    context.fillStyle = "rgb(50,50,50)";
    context.fillRect(256,0,128,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Resources: " + resources.toString(), 256 + 12, 20);

    //gems

    context.fillStyle = "rgb(255,0,255)";
    context.fillRect(384,0,128,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Power: " + power.toString() + "/" + powerStorage.toString(), 384 + 12, 20);

    //currency

    context.fillStyle = "rgb(212,175,55)";
    context.fillRect(512,0,128,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Money: " + currency.toString() + "/" + currencyStorage.toString(), 512 + 12, 20);


    //show grid button

    context.fillStyle = "rgb(168, 84, 33)";
    context.fillRect(canvas.width - 128,0,128,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("(R)eset Selection", canvas.width - 128 + 12, 20);

    //music on/off button

    context.fillStyle = "rgb(86, 76, 65)";
    context.fillRect(canvas.width - 192,0,64,32);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Music On/Off", canvas.width - 192 + 2, 20);

    //render panel background

    context.fillStyle = "rgb(175, 175, 175)";
    context.fillRect(0, canvas.height - 100, canvas.width, 100);


    buttonWidth = canvas.width / 9;

    //green building

    context.fillStyle = "rgb(0, 255, 0)";
    context.fillRect(0, canvas.height - 100, buttonWidth, 128);

    let gb = new building( 0, canvas.height - 100, 128, 64, "green", new Tile(0, 0, 0, 0, false, 0));
    gb.render(64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

   // let gb = new greenBuilding(64, canvas.height - 64, 128, 64);
    //gb.render(400, 400);

    context.fillStyle = "rgb(0, 0, 255)";
    context.fillRect(1 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let bb = new building( 0, canvas.height - 100, 128, 64, "blue", new Tile(0, 0, 0, 0, false, 0));
    bb.render((1 * buttonWidth) + 64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    // grey building

    context.fillStyle = "rgb(50, 50, 50)";
    context.fillRect(2 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let grb = new building( 0, canvas.height - 100, 128, 64, "grey", new Tile(0, 0, 0, 0, false, 0));
    grb.render((2 * buttonWidth) + 64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    // dark green building

    context.fillStyle = "rgb(25, 175, 25)";
    context.fillRect(3 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let dgb = new building( 0, canvas.height - 100, 128, 64, "dark_green", new Tile(0, 0, 0, 0, false, 0));
    dgb.render((3 * buttonWidth) +64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    //purple building

    context.fillStyle = "rgb(175, 25, 175)";
    context.fillRect(4 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let pb = new building( 0, canvas.height - 100, 128, 64, "purple", new Tile(0, 0, 0, 0, false, 0));
    pb.render((4 * buttonWidth) +64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    // pink building

    context.fillStyle = "rgb(229, 103, 210)";
    context.fillRect(5 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let pnkb = new building( 0, canvas.height - 100, 128, 64, "pink", new Tile(0, 0, 0, 0, false, 0));
    pnkb.render((5 * buttonWidth) +64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    //gold building

    context.fillStyle = "rgb(212,175,55)";
    context.fillRect(6 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let gldb = new building( 0, canvas.height - 100, 128, 64, "gold", new Tile(0, 0, 0, 0, false, 0));
    gldb.render((6 * buttonWidth) +64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    //red building

    context.fillStyle = "rgb(255,0,0)";
    context.fillRect(7 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    let rb = new building( 0, canvas.height - 100, 128, 64, "red", new Tile(0, 0, 0, 0, false, 0));
    rb.render((7 * buttonWidth) +64 + camera.x, canvas.height - 132 + camera.y, 0, 1.0);

    //new tile (brown) building

    context.fillStyle = "rgb(168, 84, 33)";
    context.fillRect(8 * buttonWidth, canvas.height - 100, buttonWidth, 128);

    //render selection square oh god this is so messy but I only have hours left my goodness gracious me

    //day progress bar

    context.fillStyle = "rgb(20, 20, 80)";
    context.fillRect(0, 32, 300, 32);

    context.fillStyle = "rgb(20, 20, 200)";
    context.fillRect(0, 32, (dayTicker / dayLength * 100) * 3, 32);

    context.beginPath();

    context.fillStyle = "rgb(232, 172, 9)";
    context.arc(16, 48, 16, 0, 2*Math.PI);
    context.fill();

    context.beginPath();

    context.fillStyle = "rgb(214, 210, 201)";
    context.arc(284, 48, 16, 0, 2*Math.PI);
    context.fill();

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Day Timer", 50, 52);

    //INFO PANEL

    let xPos = infoX * buttonWidth;
    let yPos = canvas.height - 300;

    context.fillStyle = "rgb(20, 20, 75)";
    context.fillRect(xPos, canvas.height - 300, 300, 200);

    context.fillStyle = "rgb(50, 50, 200)";
    context.fillRect(xPos, canvas.height - 300, 300, 25);

    context.strokeStyle = "rgb(20, 20, 20)";
    context.rect(xPos, canvas.height - 300, 300, 200);
    context.stroke();

    let title = "";
    let resourceCost = "";
    let cost = "";
    let powerCost = "";
    let desc = [];

    context.strokeStyle = "rgba(20,20,255, 0.5)";

    if (buildingSelected == "blue") {

        title = "Civilian Housing";
        resourceCost = blueCost.toString();
        cost = bluePrice.toString();
        desc = ["Produces Population", "Increases Max Population by 25", "Citizens consume food but also produce money -",
         "- at the end of each day", "If there is no food, your population will leave"];

         context.rect(1 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();
        

    } else if(buildingSelected == "green") {
        title = "Food Production";
        resourceCost = greenCost.toString();
        cost = greenPrice.toString();
        powerCost = "5";
        desc = ["Produces Food, requires Powered Tile", "Food Production costs Power to run"];

         context.rect(0, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();

    } else if(buildingSelected == "dark_green") {
        title = "Food Storage";
        resourceCost = darkGreenCost.toString();
        cost = darkGreenPrice.toString();
        desc = ["Increases Total Food Storage", "Doubles Produce of Connected Food Production", "Units"];

         context.rect(3 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();

    } else if(buildingSelected == "grey") {
        title = "Resource Miner";
        resourceCost = greyCost.toString();
        cost = greyPrice.toString();
        desc = ["Can only be placed on the Ground", "Mines the Ground (Tile) For Resources", "Resources are used to create Buildings", 
    "Tiles have a limited amount of resources and will", "be destroyed once used up"];


         context.rect(2 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();
    } else if(buildingSelected == "purple") {
        title = "Power Supply";
        resourceCost = purpleCost.toString();
        cost = purplePrice.toString();
        desc = ["Can only be placed on the Ground", "Powers the tile it is placed on",
    "Powered tiles can run Generators and Food", "Production units"];

         context.rect(4 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();
    } else if(buildingSelected == "pink") {
        title = "Power Generator";
        resourceCost = pinkCost.toString();
        cost = pinkPrice.toString();
        desc = ["Requires Powered Tile", "Generates Power", "Power is used to create Food"];

        
         context.rect(5 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();
    } else if(buildingSelected == "gold") {
        title = "Bank";
        resourceCost = goldCost.toString();
        cost = goldPrice.toString();
        desc = ["Can only be placed on the Ground","Increases Max Storage of Currency"];

         context.rect(6 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();

    } else if(buildingSelected == "red") {
        title = "Tower Extension";
        resourceCost = redCost.toString();
        cost = redPrice.toString();
        desc = ["Increases Maximum Number of Buildings allowed", "to be placed on Tile by 10"];

         context.rect(7 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();

    } else if(buildingSelected == "brown") {
        title = "Land Extension";
        resourceCost = brownCost.toString();
        cost = brownPrice.toString();
        desc = ["Creates New Tile"];

         context.rect(8 * buttonWidth, canvas.height - 100, buttonWidth, 128);
         context.lineWidth = 2;
         context.stroke();
    }

    context.textAlign = "left";
    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "16px Arial";
    context.fillText(title, xPos + 16, yPos + 16);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Resource Cost: " + resourceCost, xPos + 16, yPos + 36);

    if (powerCost != "") {
        context.fillStyle = "rgb(255, 255, 255)";
        context.font = "12px Arial";
        context.fillText("Power Cost: " + powerCost, xPos + 16 + 124, yPos + 36);
    }

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "12px Arial";
    context.fillText("Price: " + cost, xPos + 16, yPos + 52);

    for (let d=0;d<desc.length;d++) {
        context.fillStyle = "rgb(255, 255, 255)";
        context.font = "12px Arial";
        context.fillText(desc[d], xPos + 16, (yPos + 68) + d * 18);
    }
    

    context.textAlign = "center";



}