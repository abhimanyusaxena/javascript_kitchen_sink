var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

// Inherit from Piece
Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0); 
    let currentRow = parseInt(this.position.charAt(1)); 
    
    let targetCol = targetPosition.col; 
    let targetRow = parseInt(targetPosition.row); 

    // Calculate column and row differences
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)); // Horizontal distance
    let rowDiff = Math.abs(targetRow - currentRow); // Vertical distance

    // Check if the move is horizontal, vertical, or diagonal
    if (colDiff === rowDiff || currentCol === targetCol || currentRow === targetRow) {
        
        return true;
    }

    
    console.warn("Invalid move for queen");
    return false;
};

Queen.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        // Move queen to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    } else {
        // Invalid move, do nothing
    }
};
