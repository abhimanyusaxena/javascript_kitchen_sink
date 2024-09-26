var Bishop = function(config) {
    this.type = 'bishop';
    Piece.call(this, config);
    this.color = config.color;
    this.position = config.position;
    this.board = config.board;
};

// Properly inherit from the Piece class
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

// Move the Bishop to the target position
Bishop.prototype.moveTo = function(targetPosition) {
    if (this.board.currentTurn !== this.color) {
        console.log("Invalid move: Not your turn");
        return;
    }
    
    // Check if the move is valid
    if (this.isValidMove(targetPosition)) {
        // Check if there's a piece at the target position
        const targetPiece = this.board.getPieceAt(targetPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            this.kill(targetPiece); // Kill the target piece if it's an opponent's
        }
        
        this.position = targetPosition.col + targetPosition.row;
        this.render(); // Re-render the bishop in the new position
        console.log(this.color + " Bishop moved to " + this.position);
    } else {
        console.log("Invalid move for " + this.color + " bishop");
    }
};

// Validate the Bishop's move
Bishop.prototype.isValidMove = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charCodeAt(0) - 'a'.charCodeAt(0);
    let currentRow = parseInt(this.position.charAt(1)) - 1;
    let targetCol = targetPosition.col.charCodeAt(0) - 'a'.charCodeAt(0);
    let targetRow = parseInt(targetPosition.row) - 1;

    // Check if the move is diagonal
    if (Math.abs(targetCol - currentCol) === Math.abs(targetRow - currentRow)) {
        // Check if the path is clear
        let rowStep = targetRow > currentRow ? 1 : -1;
        let colStep = targetCol > currentCol ? 1 : -1;
        
        for (let i = 1; i < Math.abs(targetCol - currentCol); i++) {
            let checkCol = String.fromCharCode(currentCol + i * colStep + 'a'.charCodeAt(0));
            let checkRow = (currentRow + i * rowStep + 1).toString();
            if (this.board.getPieceAt({col: checkCol, row: checkRow})) {
                console.warn("Path is not clear for " + this.color + " bishop");
                return false;
            }
        }
        
        // Check if the target square is empty or contains an opponent's piece
        const targetPiece = this.board.getPieceAt(targetPosition);
        if (!targetPiece || targetPiece.color !== this.color) {
            return true;
        }
    }

    console.warn("Invalid move for " + this.color + " bishop");
    return false;
};