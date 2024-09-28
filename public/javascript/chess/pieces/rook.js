var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position[0];
    let currentRow = this.position[1];

    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row;

    if (targetCol == currentCol || targetRow == currentRow) {
        return true;
    }
    
    return false;
}

Rook.prototype.moveTo = function(newPosition){
    let isValidMove = this.isValidPosition(newPosition);

    if (!isValidMove) {
        return;
    }

    this.position = newPosition.col + newPosition.row;
    this.render();
}