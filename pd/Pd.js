/**
 * Created by Martin on 2015-10-14.
 */

// Skapar namespace
var Pd = function(){};

Pd.Game = function(){
    this.canvas = null;
    this.canvasHeight = 400;
    this.canvasWidth = 600;
    this.canvasPadding = 10;
    this.canvasStartColor = "rgb(58, 102, 105)";
    this.canvasRunningColor = "rgb(0, 0, 0)";
    this.canvasEndColor = this.canvasStartColor;
    this.textHeadingColor = "rgb(242, 215, 12)";
    this.textSpecularColor = "rgb(255, 255, 255)";

    this.planetSurfaceHeight = 80;
    this.planetBitRows = 8;
    this.planetBitCols = 16;

    this.enemiesNumWaveModifier = 5;
    this.enemiesStartNum = 5 - this.enemiesNumWaveModifier;
    this.enemiesNum = this.enemiesStartNum;
    this.enemiesWaveIndex = 0;

    this.enemiesVelocityWaveModifier = 0.1;
    this.enemiesVelocityStartModifier = 0.5 - this.enemiesVelocityWaveModifier;
    this.enemiesVelocityModifier = this.enemiesVelocityStartModifier;

    this.mode = "start";
    this.enemies = [];
    this.planet = new Pd.Planet(this.canvasWidth, this.canvasHeight, this.planetSurfaceHeight, this.planetBitRows, this.planetBitCols);

    this.weapon = new Pd.Weapon(this.canvasWidth);

    this.font = "arial"; // sätts i setup
    this.handCursor = null; // sätts i preload
    this.startScreen = null; // sätts i preload
    this.endScreen = null; // sätts i preload
    this.gameScreen = null; // sätts i preload
    this.uiTexter = []; // sätts i setup


};

Pd.Game.prototype.reset = function(){
    Pd.Tools.log("Resetting game");
    this.enemiesNum = this.enemiesStartNum;
    this.enemiesWaveIndex = 0;
    this.enemiesVelocityModifier = this.enemiesVelocityStartModifier;
};

Pd.Game.prototype.fireWeapon = function(targetX, targetY){
    this.weapon.fire(targetX, targetY);
};

Pd.Game.prototype.nextWave = function(){
    Pd.Tools.log("Spawning wave ["+this.enemiesWaveIndex+"]");

    this.enemiesWaveIndex++;
    this.enemiesNum += this.enemiesNumWaveModifier;
    this.enemiesVelocityModifier += this.enemiesVelocityWaveModifier;
    var undamagedRows = this.planet.getUndamagedRows();
    Pd.Tools.log("Reloading weapon with "+this.enemiesNum+" + " +undamagedRows+ " bombs");
    this.weapon.reload(this.enemiesNum + undamagedRows);

    this.enemies = []; // rensar för säkerhets skull
    for(var i = 0; i < this.enemiesNum; i++) {
        var targetCoord = this.planet.getRandomBitCoord();
        this.enemies[i] = new Pd.Enemy(this.canvasWidth, this.canvasHeight, this.enemiesVelocityModifier, targetCoord);
    }
};

Pd.Game.prototype.mouseClicked = function(mX, mY){

    switch(this.mode) {
        case "running":
            this.fireWeapon(mX, mY);
            break;
        case "start":
            Pd.Tools.log("Switching game mode to RUNNING");
            this.mode = "running";
            this.nextWave();
            break;
        case "end":
            Pd.Tools.log("Switching game mode to RUNNING");
            this.mode = "running";
            this.reset();
            this.nextWave();
            break;

    }
};

Pd.Game.prototype.preload = function(){
    Pd.Tools.log("Preloading");
    this.font = loadFont("fonts/silkscreen.ttf");
    this.handCursor = loadImage("gfx/cursor_hand.png");
    this.startScreen = loadImage("gfx/startscreen.jpg");
    this.endScreen = loadImage("gfx/endscreen.jpg");
    this.gameScreen = loadImage("gfx/gamescreen.jpg");
};

Pd.Game.prototype.setup = function(){
    Pd.Tools.log("Setting things up");
    var me = this; // för events

    var body = document.getElementById("game-body");
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.height = "100%";

    this.canvas = createCanvas(this.canvasWidth, this.canvasHeight);
    this.canvas.canvas.style.position = "absolute";
    this.canvas.canvas.style.width = "100%";
    this.canvas.canvas.style.height = "100%";
    this.canvas.canvas.addEventListener("click", function(ev){
        me.mouseClicked(ev.clientX, ev.clientY);
    });
    // cheatcodes för test & debug: tryck ALT-CTRL-n för nästa wave, ALT-CTRL-e för att game over
    body.addEventListener("keyup", function(ev){
        var key = event.which || event.keyCode;  // använd antingen which or keyCode, p g a browser-support
        if(key == 78 && ev.altKey && ev.ctrlKey){ // 78 = n
            me.nextWave();
        }
        if(key == 69 && ev.altKey && ev.ctrlKey){ // 69 = e
            me.mode = "end";
        }
    });

    var cX = this.canvasWidth/2;
    var cY = this.canvasHeight/2;
    this.uiTexter["start1"] = new Pd.UiText(cX, cY, "PLANET-DEFENDER", this.textHeadingColor, 50, CENTER, this.font);
    this.uiTexter["start2"] = new Pd.UiText(cX, cY+40, "[click to start]", this.textHeadingColor, 20, CENTER, this.font);
    this.uiTexter["end1"] = new Pd.UiText(cX, cY, "GAME OVER", this.textHeadingColor, 50, CENTER, this.font);
    this.uiTexter["end2"] = new Pd.UiText(cX, cY+40, "[click to re-start]", this.textHeadingColor, 20, CENTER, this.font);
    this.uiTexter["waves"] = new Pd.UiText(cX, cY-60, "Waves: 00", this.textSpecularColor, 35, CENTER, this.font);
    this.uiTexter["ammo"] = new Pd.UiText(this.canvasWidth-this.canvasPadding, this.canvasPadding*2, "Bombs 000", this.textHeadingColor, 15, RIGHT, this.font);
    this.uiTexter["wave"] = new Pd.UiText(this.canvasPadding, this.canvasPadding*2, "Wave 1", this.textHeadingColor, 15, LEFT, this.font);

    Pd.Tools.log("Here we go...game start screen coming up");
    Pd.Tools.log("Game mode is "+this.mode.toUpperCase());
};

Pd.Game.prototype.update = function(){
    // Uppdaterar enemies
    if(this.mode == "running") {
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            var collision = false;
            enemy.update();

            // kollar kollision mot PlanetBits
            if (enemy.position.y > this.planet.surfaceY - 10) { // snabbkoll för prestanda
                for (var j = 0; j < this.planet.bits.length; j++) {
                    var planetBit = this.planet.bits[j];
                    if (planetBit.coordIsInside(enemy.position)) {
                        this.planet.removeBit(planetBit);
                        collision = true;
                    }
                }
            }

            // kollar kollision mot bomber
            for (var j = 0; j < this.weapon.bombs.length; j++) {
                var bomb = this.weapon.bombs[j];
                if (bomb.coordIsInside(enemy.position)) {
                    collision = true;
                }
            }

            if (enemy.isOutOfBounds() || collision) {
                // tar bort enemy
                this.enemies.splice(i, 1); // tar bort ett element på position
            }
        }

        // kollar om allt är förlorat
        if (this.planet.bits.length <= 0) {
            Pd.Tools.log("NOOOOOOOOOO!");
            Pd.Tools.log("Switching game mode to END");
            this.mode = "end";
        }

        // kollar om det är dags för nästa wave
        if (this.enemies.length <= 0 && this.enemiesWaveIndex > 0) {
            this.nextWave();
        }
    }
};

Pd.Game.prototype.draw = function(){
    //noLoop();
    //console.log(this.mode);
    noCursor();
    switch(this.mode) {
        case "running":

            background(this.canvasRunningColor);
            image(this.gameScreen, 0, 0, this.canvasWidth, this.canvasHeight);
            // player
            this.weapon.draw();
            // Rita enemies
            for(var i = 0; i < this.enemies.length; i++) {
                var enemy = this.enemies[i];
                enemy.draw();
            }
            this.planet.draw();
            this.uiTexter["ammo"].text = "Bombs "+this.weapon.bombsNum;
            this.uiTexter["ammo"].draw();
            this.uiTexter["wave"].text = "Wave "+this.enemiesWaveIndex;
            this.uiTexter["wave"].draw();
            break;
        case "start":
            background(this.canvasStartColor);
            image(this.startScreen, 0, 0, this.canvasWidth, this.canvasHeight);

            this.uiTexter["start1"].draw();
            this.uiTexter["start2"].draw();

            image(this.handCursor, mouseX, mouseY);
            break;
        case "end":
            background(this.canvasStartColor);
            image(this.endScreen, 0, 0, this.canvasWidth, this.canvasHeight);
            this.uiTexter["end1"].draw();
            this.uiTexter["end2"].draw();
            this.uiTexter["waves"].text = "Waves: "+this.enemiesWaveIndex;
            this.uiTexter["waves"].draw();

            image(this.handCursor, mouseX, mouseY);
            break;
        default:
            cursor();
            background(this.canvasEndColor);
    }

};