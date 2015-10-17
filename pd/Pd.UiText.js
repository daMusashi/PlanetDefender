/**
 * Created by Martin on 2015-10-15.
 */
Pd.UiText = function(x, y, text, color, size, align, font) {

    this.text = text || "Lorem Ipsum";
    this.color = color || "rgb(84, 222, 16)";
    this.size = size || 18;
    this.align = align || CENTER;
    this.style = BOLD;
    this.font = font || "arial";
    this.position = new Pd.Coord(x || 0, y || 0);
};

Pd.UiText.prototype.draw = function() {
    fill(this.color);
    textAlign(this.align);
    textSize(this.size);
    textStyle(this.style);
    textFont(this.font);
    text(this.text, this.position.x, this.position.y);
};