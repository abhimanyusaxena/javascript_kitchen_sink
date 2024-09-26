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
        // Check if the move is a kill (diagonal capture)
        if (this.isDiagonalCapture(targetPosition)) {
            const targetPiece = this.board.getPieceAt(targetPosition);
            this.kill(targetPiece); // Kill the target piece
        }
        
        this.position = targetPosition.col + targetPosition.row;
        this.render(); // Re-render the pawn in the new position
        console.log("Pawn moved to " + this.position);
    } else {
        console.log("Invalid move for pawn");
    }
};

// Kill logic
Pawn.prototype.kill = function(targetPiece) {
    // Remove the target piece from the board
    const targetPosition = targetPiece.position;
    const targetElement = document.querySelector(`[data-col="${targetPosition[0]}"] [data-row="${targetPosition[1]}"]`);
    targetElement.innerHTML = ''; // Remove the target piece from the board

    // Remove the target piece from the appropriate pieces object
    if (targetPiece.color === 'white') {
        const index = this.board.whitePieces.pawns.indexOf(targetPiece);
        if (index !== -1) {
            this.board.whitePieces.pawns.splice(index, 1);
        }
    } else {
        const index = this.board.blackPieces.pawns.indexOf(targetPiece);
        if (index !== -1) {
            this.board.blackPieces.pawns.splice(index, 1);
        }
    }

    console.log("Pawn killed " + targetPiece.type);
};

// Validate the Pawn's move
Pawn.prototype.isValidMove = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the allowed move distance based on pawn color
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Moving straight
    if (targetPosition.col === currentCol) {
        if (targetPosition.row === (currentRow + moveDistance).toString()) {
            return true; // Regular one-square move
        } else if (currentRow === initialRow && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            return true; // Initial two-square move
        }
    }

    // Diagonal movement is only valid for capturing an opponent's piece
    if (this.isDiagonalCapture(targetPosition)) {
        return true; // Diagonal capture
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for pawn");
    return false;
};

// Check if the move is a diagonal capture
Pawn.prototype.isDiagonalCapture = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    return Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
           targetPosition.row === (currentRow + (this.color === 'white' ? 1 : -1)).toString();
};

// Inherit from the Piece class properly
Pawn.prototype.constructor = Pawn;
