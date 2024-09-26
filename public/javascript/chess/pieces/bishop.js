var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

// Function to check if the target position is valid for the bishop
Bishop.prototype.isValid = function(targetPosition) {
    let currentCol = this.position.charAt(0); // E
    let currentRow = parseInt(this.position.charAt(1)); // 1
    let targetCol = targetPosition.col; // C
    let targetRow = targetPosition.row; // 3
    let targetPiece = this.board.getPieceAt(targetPosition);

    // Check for diagonal movement
    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow)) {
        // Check if the path to the target position is clear
        let colDirection = (targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) > 0 ? 1 : -1; // 1 for right, -1 for left
        let rowDirection = (targetRow - currentRow) > 0 ? 1 : -1; // 1 for down, -1 for up
        
        for (let i = 1; i < Math.abs(targetRow - currentRow); i++) {
            let intermediateCol = String.fromCharCode(currentCol.charCodeAt(0) + i * colDirection);
            let intermediateRow = currentRow + i * rowDirection;
            let intermediatePosition = { col: intermediateCol, row: intermediateRow };

            // If there's a piece in the way, the move is invalid
            if (this.board.getPieceAt(intermediatePosition)) {
                console.warn("Cannot move; path is blocked for bishop.");
                return false;
            }
        }

        // Check if there is a piece at the target position
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece); // Capture the piece
        }
        return true; // Valid move
    }

    console.warn("Invalid move for bishop");
    return false; // Invalid move
};

// Function to move the bishop to a new position
Bishop.prototype.moveTo = function(newPosition) {
    if (this.isValid(newPosition)) {
        this.position = newPosition.col + newPosition.row; // Update position
        this.render(); // Render the bishop at the new position
        this.board.switchTurn(); // Switch turn after moving
    }
};