var Queen = function(config) {
    this.type = 'queen';
    Piece.call(this, config);
};

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.moveTo = function(targetPosition) {
    if (!this.isValidMove(targetPosition)) {
        console.log("Invalid move for the queen");
        return;
    }

    const targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece) {
        this.kill(targetPiece);
    }

    this.position = targetPosition.col + targetPosition.row;
    this.render();
    console.log(`Queen moved to ${targetPosition.col}${targetPosition.row}`);
};

Queen.prototype.isValidMove = function(targetPosition) {
    var currentCol = this.position[0].toUpperCase().charCodeAt(0);
    var currentRow = parseInt(this.position[1], 10);
    var targetCol = targetPosition.col.toUpperCase().charCodeAt(0);
    var targetRow = parseInt(targetPosition.row, 10);

    var colDiff = Math.abs(currentCol - targetCol);
    var rowDiff = Math.abs(currentRow - targetRow);

    if (colDiff === rowDiff || currentCol === targetCol || currentRow === targetRow) {
        if (!this.isPathClear(targetPosition)) {
            console.log("Path is blocked");
            return false;
        }
        return true;
    } else {
        console.log("Invalid Queen move");
        return false;
    }
};

Queen.prototype.isPathClear = function(targetPosition) {
    var currentCol = this.position[0].toUpperCase().charCodeAt(0);
    var currentRow = parseInt(this.position[1], 10);
    var targetCol = targetPosition.col.toUpperCase().charCodeAt(0);
    var targetRow = parseInt(targetPosition.row, 10);

    var colStep = targetCol > currentCol ? 1 : (targetCol < currentCol ? -1 : 0);
    var rowStep = targetRow > currentRow ? 1 : (targetRow < currentRow ? -1 : 0);

    var nextCol = currentCol + colStep;
    var nextRow = currentRow + rowStep;

    while (nextCol !== targetCol || nextRow !== targetRow) {
        var positionToCheck = String.fromCharCode(nextCol) + nextRow;
        if (this.board.getPieceAt({ col: String.fromCharCode(nextCol), row: nextRow })) {
            return false;
        }
        nextCol += colStep;
        nextRow += rowStep;
    }

    return true;
};

Queen.prototype.kill = function(targetPiece) {
    if (!targetPiece) {
        console.error("No target piece found for capture");
        return;
    }

    console.log(`${this.type} is capturing ${targetPiece.type} at ${targetPiece.position}`);
    this.board.removePiece(targetPiece);
    console.log(`${targetPiece.type} has been captured and removed from the board`);
};
