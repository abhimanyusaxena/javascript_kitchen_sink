var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});

King.prototype.isValidMove = function(targetPosition){
    
}
King.prototype.moveTo = function(targetPosition){
    if(this.isValidMove(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }else{
        console.log("Invalid move for king");
    }

}