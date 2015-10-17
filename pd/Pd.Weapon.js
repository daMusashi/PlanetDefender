/**
 * Created by Martin on 2015-10-14.
 */
Pd.Weapon = function(canvasWidth){

    this.coolDown = 2000;
    this.availableColor = "rgb(15, 193, 247)";
    this.cooldownColor = "rgb(156, 175, 181)";
    this.size = 50;

    this.status = "idle";
    this.bombsNum = 0;
    this.bombs = [];
    this.canvasWidth = canvasWidth;

};

Pd.Weapon.prototype.isAvailable = function(){
    if(this.status == "idle"){
        return true;
    } else {
        return false;
    }
};

Pd.Weapon.prototype.reload = function(bombsNum){
    this.bombsNum += bombsNum;
    if(this.bombsNum > 0){
        this.status = "idle";
    }
};

Pd.Weapon.prototype.fire = function(targetX, targetY){
    if(this.isAvailable()) {
        this.bombs.push(new Pd.Bomb(targetX, targetY, this.canvasWidth));
        this.bombsNum--;
        if(this.bombsNum <= 0){
            this.status = "empty";
        }
    }

};

Pd.Weapon.prototype.draw = function(){

    if(this.isAvailable()) {
        stroke(this.availableColor);
    } else {
        stroke(this.cooldownColor);
    }
    noFill();
    ellipse(mouseX, mouseY, this.size, this.size);

    for(var i = 0; i < this.bombs.length; i++){
        var bomb = this.bombs[i];
        if(bomb.done){
            this.bombs.splice(i, 1); // tar bort bomb från listan om den är färdig-exploderad
        } else {
            bomb.draw();
        }
    }
};