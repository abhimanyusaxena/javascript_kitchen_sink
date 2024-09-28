var Queen = function(config) {
    this.type = 'queen';
    this.color = config.color; 
    this.position = config.position; 
    this.constructor(config); 
};

Queen.prototype = Object.create(Piece.prototype); 

Queen.prototype.isPathClearStraight = function (curRow, curCol, tarRow, tarCol, board) {
    if (curRow === tarRow) {
        const step = curCol < tarCol ? 1 : -1;
        for (let col = curCol + step; col !== tarCol; col += step) {
            const cell = { row: curRow, col: String.fromCharCode(64 + col) };  
            if (board.getPieceAt(cell)) {
                return false;  // Obstacle in the way
            }
        }
    } else if (curCol === tarCol) {
        const step = curRow < tarRow ? 1 : -1;
        for (let row = curRow + step; row !== tarRow; row += step) {
            const cell = { row: row, col: String.fromCharCode(64 + curCol) };  
            if (board.getPieceAt(cell)) {
                return false;  // Obstacle in the way
            }
        }
    }
    return true;
};

Queen.prototype.isPathClearDiagonal = function (curRow, curCol, tarRow, tarCol, board) {
    const rowStep = curRow < tarRow ? 1 : -1;
    const colStep = curCol < tarCol ? 1 : -1;
    let row = curRow + rowStep;
    let col = curCol + colStep;

    while (row !== tarRow && col !== tarCol) {
        const cell = { row: row, col: String.fromCharCode(64 + col) };  
        if (board.getPieceAt(cell)) {
            return false;  // Obstacle in the way
        }
        row += rowStep;
        col += colStep;
    }
    return true;
};

Queen.prototype.isValidPosition = function(targetPosition, board) {
    const curRow = parseInt(this.position[1], 10);
    const curCol = this.position.charCodeAt(0) - 64;

    const tarRow = parseInt(targetPosition.row, 10);
    const tarCol = targetPosition.col.charCodeAt(0) - 64;
  
    const rowDiff = Math.abs(tarRow - curRow);
    const colDiff = Math.abs(tarCol - curCol);
  
    // Check for straight move (same row or same column)
    if (curRow === tarRow || curCol === tarCol) {
        return this.isPathClearStraight(curRow, curCol, tarRow, tarCol, board);
    }
  
    // Check for diagonal move (row difference must equal column difference)
    if (rowDiff === colDiff) {
        return this.isPathClearDiagonal(curRow, curCol, tarRow, tarCol, board);
    }
  
    return false;
};

// Method to move the Queen to the target position if the move is valid
Queen.prototype.moveTo = function(targetPosition, board) {
    if (this.isValidPosition(targetPosition, board)) {
        // Move the Queen to the new position
        this.position = targetPosition.col + targetPosition.row;

        this.render();
    } else {
        console.warn("Invalid move");
    }
};
