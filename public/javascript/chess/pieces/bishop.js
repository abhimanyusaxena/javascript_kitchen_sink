var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};



Bishop.prototype = new Piece({});

Bishop.prototype.moveTo = function(newPosition){
    if (this.isValid(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
};