/**
 * Created by Martin on 2015-10-14.
 */

Pd.PlanetBit = function(x, y, w, h, row, col){
    this.padding = 1;
    this.color = "rgb(100, 200, 100)";

    this.width = w - 2*this.padding;
    this.height = h - 2*this.padding;
    this.x = x+this.padding;
    this.y = y+this.padding;
    this.row = row;
    this.col = col;

};

Pd.PlanetBit.prototype.draw = function(){
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
};

Pd.PlanetBit.prototype.getCenterCoord = function(){
    var x = this.x + this.width/2;
    var y = this.y + this.height/2;

    return new Pd.Coord(x, y);
};

Pd.PlanetBit.prototype.coordIsInside = function(coord){
    var leftX = this.x;
    var rightX = this.x + this.width;
    var topY = this.y;
    var bottomY = this.y + this.height;
    if((coord.x > leftX)&&(coord.x < rightX)&&(coord.y > topY)&&(coord.y < bottomY)){
        return true;
    } else {
        return false;
    }
};
