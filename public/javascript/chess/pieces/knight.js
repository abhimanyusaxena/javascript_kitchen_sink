var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidMove = function(targetPosition) {

    var currentRow = parseInt(this.position[1], 10);
    var targetRow = parseInt(targetPosition.row, 10);
    var currentCol = this.position[0].toUpperCase().charCodeAt(0) - 65; 
    var targetCol = targetPosition.col.toUpperCase().charCodeAt(0) - 65;

    var rowDiff = Math.abs(targetRow - currentRow);
    var colDiff = Math.abs(targetCol - currentCol);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
        return true;
    } 
    else {
        console.log("Invalid move: Knight must move in an L-shape");
        return false;
    }
};

Knight.prototype.moveTo = function(targetPosition) {
    var isValidMove = this.isValidMove(targetPosition);
    if (!isValidMove) {
        console.log("Invalid move for knight");
        return;
    }
    
    const targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece) {
        this.kill(targetPiece);
    }
    this.position = targetPosition.col + targetPosition.row;
    this.render();
};


