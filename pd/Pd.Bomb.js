/**
 * Created by Martin on 2015-10-14.
 */
Pd.Bomb = function(x, y, canvasWidth) {
    this.targetSize = 10;
    this.targetColor = "rgb(15, 193, 247)";

    this.fireStrokeLength = 150;
    this.fireStrokeVelocity = 10;
    this.fireStrokeHitsize = 10;

    this.effectMaxSize = 50;
    this.effectStartSize = 5;
    this.effectSpeed = 1;
    this.strokeColor = "rgb(247, 240, 15)";
    this.fillColor = "rgba(247, 113, 17, ";

    this.isExploding = false;
    this.size = this.effectStartSize;
    this.target = new Pd.Coord(x, y);
    this.done = false;

    this.fire1StartPos = new Pd.Coord(0, 0);
    this.fire1Pos = this.fire1StartPos.clone();
    this.fire1Distance = Pd.Coord.getDistance(this.target, this.fire1StartPos);
    this.fire1Angle = Pd.Coord.getAngle(this.target, this.fire1StartPos);
    this.fire1velocity = this.fireStrokeVelocity * this.fire1Distance/canvasWidth;

    this.fire2StartPos = new Pd.Coord(canvasWidth, 0);
    this.fire2Pos = this.fire2StartPos.clone();
    this.fire2Distance = Pd.Coord.getDistance(this.target, this.fire2StartPos);
    this.fire2Angle = Pd.Coord.getAngle(this.target, this.fire2StartPos);
    this.fire2velocity = this.fireStrokeVelocity * this.fire2Distance/canvasWidth;
};

Pd.Bomb.prototype.draw = function(){
    if(!this.isExploding){
        var fire1p1 = this.fire1Pos;
        var fire1DistanceLeft = Pd.Coord.getDistance(this.target, this.fire1Pos);
        var fire1LengthModifier = fire1DistanceLeft/this.fire1Distance;
        var fire1p0x = fire1p1.x - (this.fireStrokeLength* fire1LengthModifier) * Math.cos(this.fire1Angle);
        var fire1p0y = fire1p1.y - (this.fireStrokeLength* fire1LengthModifier) * Math.sin(this.fire1Angle);

        var fire2p1 = this.fire2Pos;
        var fire2DistanceLeft = Pd.Coord.getDistance(this.target, this.fire2Pos);
        var fire2LengthModifier = fire2DistanceLeft/this.fire2Distance;
        var fire2p0x = fire2p1.x - (this.fireStrokeLength* fire2LengthModifier) * Math.cos(this.fire2Angle);
        var fire2p0y = fire2p1.y - (this.fireStrokeLength* fire2LengthModifier) * Math.sin(this.fire2Angle);

        // ritar fire strokes
        stroke(this.strokeColor);
        noFill();
        line(fire1p0x, fire1p0y, fire1p1.x, fire1p1.y);
        line(fire2p0x, fire2p0y, fire2p1.x, fire2p1.y);
        // ritar target
        stroke(this.targetColor);
        line(this.target.x-this.targetSize/2, this.target.y, this.target.x+this.targetSize/2, this.target.y);
        line(this.target.x, this.target.y-this.targetSize/2, this.target.x, this.target.y+this.targetSize/2);

        if(fire1DistanceLeft > this.fireStrokeHitsize) {
            // uppdaterar värden för nästa draw
            this.fire1velocity * (100*fire1LengthModifier* fire1LengthModifier);
            var fire1velX = this.fire1velocity * Math.cos(this.fire1Angle);
            var fire1velY = this.fire1velocity * Math.sin(this.fire1Angle);
            this.fire1Pos.x += fire1velX;
            this.fire1Pos.y += fire1velY;

            this.fire2velocity * fire2LengthModifier;
            var fire2velX = this.fire2velocity * Math.cos(this.fire2Angle);//) *fire2LengthModifier;
            var fire2velY = this.fire2velocity * Math.sin(this.fire2Angle);//) *fire2LengthModifier;
            console.log(fire2LengthModifier);
            this.fire2Pos.x += fire2velX;
            this.fire2Pos.y += fire2velY;
        } else {
            // växlar till explosion/effect
            this.isExploding = true;
        }

    } else {
        if (this.size < this.effectMaxSize) {
            stroke(this.strokeColor);
            var fillColor = this.fillColor + this.size / this.effectMaxSize + ")";
            fill(fillColor);
            ellipse(this.target.x, this.target.y, this.size, this.size);
        } else {
            this.done = true;
        }
        this.size += this.effectSpeed;
    }
};

Pd.Bomb.prototype.coordIsInside = function(coord){
    if(this.isExploding) {
        var distance = Pd.Coord.getDistance(this.target, coord);

        if(distance < this.size/2) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};