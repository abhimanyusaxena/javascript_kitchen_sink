var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};



Queen.prototype = new Piece({});
Queen.prototype.move = function(newPosition){

}