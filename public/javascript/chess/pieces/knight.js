var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to row and column
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Calculate column and row differences
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    // Check if the move is valid (L-shaped move: two squares in one direction and one in the other)
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
        return true;
    }

    console.warn("Invalid move for knight");
    return false;
};

Knight.prototype.moveTo = function(targetPosition) {    
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else {
        // NOOP
    }
};
