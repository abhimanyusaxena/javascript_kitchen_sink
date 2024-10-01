var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.moveTo = function(targetPosition) {
    var isValidMove = this.isValidMove(targetPosition);
    if (!isValidMove) {
        console.log("Invalid move for queen");
        return;
    }
    
    const targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece) {
        this.kill(targetPiece);
    }

    console.log("move function starts here");
    var newPos = targetPosition.col + targetPosition.row;
    this.position = newPos;
    this.render();
    console.log("move function successfully ends here");
};

Queen.prototype.isValidMove = function(targetPosition) {
    var currentRow = parseInt(this.position[1], 10);
    var targetRow = parseInt(targetPosition.row, 10);
    var currentCol = this.position[0].toUpperCase().charCodeAt(0) - 65; 
    var targetCol = targetPosition.col.toUpperCase().charCodeAt(0) - 65;
    
    console.log("currentRow: ", currentRow, "targetRow: ", targetRow);
    console.log("currentCol: ", currentCol, "targetCol: ", targetCol);

    var rowDiff = Math.abs(targetRow - currentRow);
    var colDiff = Math.abs(targetCol - currentCol);

    // The queen can move any number of squares vertically, horizontally, or diagonally.
    if ((rowDiff === colDiff) || (currentRow === targetRow) || (currentCol === targetCol)) {
        // Check for obstacles
        if (this.isPathBlocked(currentRow, currentCol, targetRow, targetCol)) {
            console.log("Invalid move: There is an obstacle in the path.");
            return false;
        }
        return true;
    } else {
        console.log("Invalid move: Queen must move vertically, horizontally, or diagonally.");
        return false;
    }
};

// Helper method to check if there's any obstacle in the path of the Queen
Queen.prototype.isPathBlocked = function(currentRow, currentCol, targetRow, targetCol) {
    var rowStep = (targetRow > currentRow) ? 1 : (targetRow < currentRow) ? -1 : 0;//1-->forward, -1-->backward, 0--> no movement
    var colStep = (targetCol > currentCol) ? 1 : (targetCol < currentCol) ? -1 : 0;

    var row = currentRow + rowStep;
    var col = currentCol + colStep;

    while (row !== targetRow || col !== targetCol) {
        var position = {
            row: row.toString(),
            col: String.fromCharCode(65 + col)
        };

        // Check if a piece exists at this position
        if (this.board.getPieceAt(position)) {
            return true; // There is an obstacle
        }

        row += rowStep;
        col += colStep;
    }

    return false; // No obstacles
};