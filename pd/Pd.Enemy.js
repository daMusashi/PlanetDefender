/**
 * Created by Martin on 2015-10-14.
 */

Pd.Enemy = function(canvasWidth, canvasHeight, velocityModifier, targetCoord){
    var randomStartX = Pd.Tools.getRandomIntValue(0, canvasWidth);
    var randomTargetX = Pd.Tools.getRandomIntValue(0, canvasWidth);
    this.canvasHeight = canvasHeight; // sparar andan för koll av out-of-bounds

    this.startCoord = new Pd.Coord(randomStartX, 0);
    this.endCoord = targetCoord || new Pd.Coord(randomTargetX, canvasHeight);

    var velModifier = velocityModifier || 1;
    this.velocity = Pd.Tools.getRandomFloatValue(0.3, 1.0) * velModifier;

    this.position = this.startCoord.clone();

    // tar reda på vinkeln startCoord och slutCoord - kommer att användas för att lägga på velocity i denna riktning
    var delta = Pd.Coord.minus(this.endCoord, this.startCoord);
    this.angle = delta.getAngle(); // i radianer

    // diverse egenskaper som beskriver utseende
    this.color = "rgb(255, 255, 255)";
    this.trailColor = "rgb(60, 60, 60)";
    this.size = 4;

};

Pd.Enemy.prototype.update = function(){
    // uppdaterar position med velocity och angle
    var velocityX = this.velocity * Math.cos(this.angle);
    var velocityY = this.velocity * Math.sin(this.angle);

    // uppdaterar position
    this.position.x += velocityX;
    this.position.y += velocityY;

};

Pd.Enemy.prototype.draw = function(){
    fill(this.color);
    stroke(this.trailColor);

    ellipse(this.position.x, this.position.y, this.size, this.size);
    line(this.startCoord.x, this.startCoord.y, this.position.x, this.position.y);
};

/**
 * Kollar om enemy nått åkt utanför skärmen
 * Behöver bara kolla y moy canvasHeight, då enemies bara färdas neråt
 * @returns {boolean}
 */
Pd.Enemy.prototype.isOutOfBounds = function(){
    if(this.position.y > this.canvasHeight){
        return true;
    } else {
        return false;
    }
};