/**
 * Created by Martin on 2015-10-14.
 */

game = new Pd.Game();

function preload() {
    game.preload();
}

function setup() {

    game.setup();
}

function mouseClicked() {
    //game.mouseClicked(mouseX, mouseY);
}

function draw() {

    game.update();

    game.draw();

}