/**
 * Created by Martin on 2015-10-14.
 */
/**
 * Koordinat-objekt
 * @param x
 * @param y
 * @constructor
 */
Pd.Coord = function(x, y){
    this.x = x;
    this.y = y;
};

Pd.Coord.prototype.getAngle = function(){
    return Math.atan2(this.y, this.x);
};

Pd.Coord.prototype.getLength = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

Pd.Coord.prototype.clone = function(){
    return new Pd.Coord(this.x, this.y);
};

// statisk
Pd.Coord.getAngle = function(coord1, coord2){
    var delta = Pd.Coord.minus(coord1, coord2);
    return delta.getAngle();
};

// statisk
Pd.Coord.getDistance = function(coord1, coord2){
    var delta = Pd.Coord.minus(coord1, coord2);
    return delta.getLength();
};

// statisk
Pd.Coord.minus = function(coord1, coord2){
    var dX = coord1.x - coord2.x;
    var dY = coord1.y - coord2.y;
    return new Pd.Coord(dX, dY);
};

// statisk
Pd.Coord.plus = function(coord1, coord2){
    var dX = coord1.x + coord2.x;
    var dY = coord1.y + coord2.y;
    return new Pd.Coord(dX, dY);
};

Pd.Coord.prototype.toString = function(){
    return "<COORD x:"+this.x+"|y:"+this.y+">";
};