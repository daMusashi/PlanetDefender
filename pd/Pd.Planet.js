/**
 * Created by Martin on 2015-10-14.
 */
Pd.Planet = function(canvasWidth, canvasHeight, surfaceHeight, rows, cols){
    this.grid = []; // alla planetsBits i en grid[row][col] - används till undersöka oskadade rader (som ger bomber)
    this.bits = []; // alla planetBits i en "platt" lista för kollsions-test etc.
    this.surfaceY = canvasHeight - surfaceHeight; // Y-värde vid vilket "marken" (planetBits börjar).
    this.rows = rows;
    this.cols = cols;

    // skapar planet/grid
    var cellWidth = canvasWidth/cols;
    var cellHeight = surfaceHeight/rows;
    for(var i = 0; i < rows; i++){
        this.grid[i] = [];
        for(var j = 0; j < cols; j++){
            var x = j * cellWidth;
            var y = canvasHeight - (i * cellHeight) - cellHeight;
            var planetBit = new Pd.PlanetBit(x, y, cellWidth, cellHeight, i, j);
            this.grid[i][j] = planetBit;
            this.bits.push(planetBit);
        }
    }

};

Pd.Planet.prototype.removeBit = function(planetBit){
    var i = this.bits.indexOf(planetBit);
    this.bits.splice(i, 1);
    this.grid[planetBit.row][planetBit.col] = null;
};

Pd.Planet.prototype.getUndamagedRows = function(){
    var undamagedRows = 0;
    for(var i = 0; i < this.rows; i++){
        var rowDamaged = false;
        for(var j = 0; j < this.cols; j++){
            if(!this.grid[i][j]){
                rowDamaged = true;
            }
        }
        if(!rowDamaged){
            undamagedRows++;
        }
    }
    Pd.Tools.log("Undamed rows "+undamagedRows);
    return undamagedRows;
};

Pd.Planet.prototype.getRandomBitCoord = function(){
    if(this.bits.length > 0){
        var i = Pd.Tools.getRandomIntValue(0, this.bits.length-1);
        return this.bits[i].getCenterCoord();
    } else {
        return null;
    }
};

Pd.Planet.prototype.draw = function(){
    /*for(var i = 0; i < this.grid.length; i++){
        for(var j = 0; j < this.grid[i].length; j++){
            var bit;
            if(bit = this.grid[i][j]) {
                bit.draw();
            }
        }
    }*/
    for(var i = 0; i < this.bits.length; i++){
        this.bits[i].draw();
    }
};