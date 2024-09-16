var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});
Knight.prototype.move = function(newPosition){

}