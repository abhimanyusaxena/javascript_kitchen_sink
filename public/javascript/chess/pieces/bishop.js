var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};



Bishop.prototype = new Piece({});
Bishop.prototype.move = function(newPosition){

}