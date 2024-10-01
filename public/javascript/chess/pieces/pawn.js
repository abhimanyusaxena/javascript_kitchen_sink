var Pawn = function(config) {
    this.type = 'pawn';
    Piece.call(this, config);  
    this.color = config.color;
    this.position = config.position; 
    this.board = config.board; 
};

// Properly inherit from the Piece class
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

// Move the Pawn to the target position
Pawn.prototype.moveTo = function(targetPosition) {
    if (this.board.currentTurn !== this.color) {
        console.log("Invalid move: Not your turn");
        return;
    }
    
    // Check if the move is valid
    if (this.isValidMove(targetPosition)) {
        const targetPiece = this.board.getPieceAt(targetPosition);
        
        // Check if it is a capture move
        if (this.isDiagonalCapture(targetPosition) && targetPiece && targetPiece.color !== this.color) {
            this.kill(targetPiece); // Capture the target piece
        } else if (this.isStraightMove(targetPosition) && !targetPiece) {
            // Normal straight move, no capture
        } else {
            console.log("Invalid move: Cannot move there");
            return;
        }
        
        this.position = targetPosition.col + targetPosition.row;
        this.render(); // Re-render the pawn in the new position
        console.log("Pawn moved to " + this.position);
    } else {
        console.log("Invalid move for pawn");
    }
};

// Validate the Pawn's move
Pawn.prototype.isValidMove = function(targetPosition) {
    return this.isStraightMove(targetPosition) || this.isDiagonalCapture(targetPosition);
};

// Check if the move is a valid straight move (forward)
Pawn.prototype.isStraightMove = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance based on pawn color
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Straight movement (no column change)
    if (targetPosition.col === currentCol) {
        // Regular one-square move
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            return true;
        }
        // Initial two-square move
        else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            return true;
        }
    }

    return false; // Invalid straight move
};

// Check if the move is a diagonal capture
Pawn.prototype.isDiagonalCapture = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Check diagonal move
    if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
        targetPosition.row === (currentRow + (this.color === 'white' ? 1 : -1)).toString()) {
        const targetPiece = this.board.getPieceAt(targetPosition);
        return targetPiece && targetPiece.color !== this.color; // Only capture if there's an opponent's piece
    }

    return false;
};
