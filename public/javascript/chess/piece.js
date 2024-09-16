var Piece = function(config){
    this.position = config.position;
    this.color = config.color;
}
Piece.prototype.move = function(targetPosition){
    console.log("Method not implemeted by: " + typeof(this));
}
Piece.prototype.kill = function(targetPiece){
    console.log("Method not implemeted by: " + typeof(this));
}

Piece.prototype.render = function(){
    var row = this.position[0];
    var col = this.position[1];
    var element = document.querySelector(`[data-row="${row}"] [data-col="${col}"]`);
    if (element) {
        element.classList.add('piece', this.color, this.type);
    } else {
        console.warn(`Element not found for position: ${this.position}`);
    }
}