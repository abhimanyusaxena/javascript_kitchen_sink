var Pawn = function(config, board) {
    this.type = 'pawn';
    this.board = board; // Store a reference to the board
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidMove = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;

    // Check for a piece directly in front of the pawn
    let pieceInFront = this.board.getPieceAt({
        col: currentCol,
        row: (currentRow + moveDistance).toString()
    });

    if (targetPosition.col === currentCol) {
        // Regular move
        if (!pieceInFront && targetPosition.row === (currentRow + moveDistance).toString()) {
            return true; // Move forward one space
        } else if (currentRow === initialRow && !pieceInFront && targetPosition.row === (currentRow + 2 * moveDistance).toString()) {
            return true; // Move two spaces on the first move
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
               targetPosition.row === (currentRow + moveDistance).toString()) {
        // Diagonal capture
        let pieceToCapture = this.board.getPieceAt(targetPosition);
        if (pieceToCapture && pieceToCapture.color !== this.color) {
            return 'capture'; // Valid capture move
        }
    }

    console.warn("Invalid move for pawn");
    return false;
};

Pawn.prototype.moveTo = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true) {
        // Move the pawn to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else if (result === 'capture') {
        // Capture the piece and move
        let pieceToCapture = this.board.getPieceAt(targetPosition);
        if (pieceToCapture) {
            pieceToCapture.kill();
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    }
    return false; // Invalid move
};

Pawn.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null;
};
