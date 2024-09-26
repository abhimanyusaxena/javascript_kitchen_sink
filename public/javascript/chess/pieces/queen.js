var Queen = function(config) {
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to row and column
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate column and row differences
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    // Check if the move is valid (same row, same column, or same diagonal)
    if (currentCol === targetCol || currentRow === targetRow || colDiff === rowDiff) {
        return true;
    }

    console.warn("Invalid move for queen");
    return false;
};

Queen.prototype.moveTo = function(targetPosition) {    
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else {

    }
};
