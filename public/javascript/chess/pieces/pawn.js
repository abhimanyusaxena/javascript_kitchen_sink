var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};



Pawn.prototype = new Piece({});
Pawn.prototype.moveTo = function(targetPosition){
    console.log(this);
    console.log(targetPosition)
}