var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(targetPosition, board) {
    
    let currentCol = this.position.charAt(0); 
    let currentRow = parseInt(this.position.charAt(1)); 

    
    let targetCol = targetPosition.col; 
    let targetRow = parseInt(targetPosition.row); 

    // Calculate column and row differences
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)); // Horizontal distance
    let rowDiff = Math.abs(targetRow - currentRow); // Vertical distance

    // Check if the move is horizontal, vertical, or diagonal
    if (colDiff === rowDiff || currentCol === targetCol || currentRow === targetRow) {
        // Before validating the move, check if the path is clear
        if (this.isPathClear(currentCol, currentRow, targetCol, targetRow, board)) {
            return true; // Valid move if path is clear
        } else {
            console.warn("Move blocked by another piece");
            return false; // Path is not clear
        }
    }

    // Invalid Queen move
    console.warn("Invalid move for queen");
    return false;
};

// Helper function to check if path is clear
Queen.prototype.isPathClear = function(currentCol, currentRow, targetCol, targetRow, board) {
    let colIncrement = 0, rowIncrement = 0;

    // Calculate column and row increments based on the direction of movement
    if (currentCol !== targetCol) {
        colIncrement = currentCol < targetCol ? 1 : -1; // Move left or right
    }
    if (currentRow !== targetRow) {
        rowIncrement = currentRow < targetRow ? 1 : -1; // Move up or down
    }

    let col = currentCol.charCodeAt(0) + colIncrement;
    let row = currentRow + rowIncrement;

    // Traverse from current position to target position, checking for pieces
    while (col !== targetCol.charCodeAt(0) || row !== targetRow) {
        let square = String.fromCharCode(col) + row;

        if (board[square] !== null) { // If there's a piece in the way
            return false;
        }

        // Move along the path
        col += colIncrement;
        row += rowIncrement;
    }

    return true; // Path is clear
};

Queen.prototype.moveTo = function(targetPosition, board) {
    if (this.isValidPosition(targetPosition, board)) {
        // Move queen to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    } else {
        // Invalid move, do nothing
    }
};
