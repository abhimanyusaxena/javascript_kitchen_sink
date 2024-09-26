var Bishop = function(config, board) {
    this.type = 'bishop';
    this.board = board;
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.isValidMove = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is diagonal
    if (Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0)) !== Math.abs(currentRow - targetRow)) {
        console.warn("Invalid move for bishop: Not a diagonal move");
        return false;
    }

    // Check for obstacles along the path
    let colStep = (targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) > 0 ? 1 : -1;
    let rowStep = (targetRow - currentRow) > 0 ? 1 : -1;

    let colCheck = currentCol.charCodeAt(0) + colStep;
    let rowCheck = currentRow + rowStep;

    while (colCheck !== targetCol.charCodeAt(0) && rowCheck !== targetRow) {
        let pieceOnPath = this.board.getPieceAt({
            col: String.fromCharCode(colCheck),
            row: rowCheck.toString()
        });

        if (pieceOnPath) {
            console.warn("Invalid move for bishop: Piece blocking path");
            return false;
        }

        colCheck += colStep;
        rowCheck += rowStep;
    }

    // Check if the target position is occupied by an opponent's piece
    let pieceAtTarget = this.board.getPieceAt(targetPosition);
    if (pieceAtTarget && pieceAtTarget.color === this.color) {
        console.warn("Invalid move for bishop: Cannot capture own piece");
        return false;
    } else if (pieceAtTarget && pieceAtTarget.color !== this.color) {
        return 'capture'; // Valid capture move
    }

    return true; // Valid move
};

Bishop.prototype.moveTo = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true) {
        // Move the bishop to the new position
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

Bishop.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null;
};
