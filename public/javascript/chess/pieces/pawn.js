var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};



Pawn.prototype = new Piece({});
Pawn.prototype.move = function(newPosition){

}