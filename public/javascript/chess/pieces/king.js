var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});
King.prototype.move = function(newPosition){

}