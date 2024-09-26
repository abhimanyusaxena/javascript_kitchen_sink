var King = function(config, board) {
    this.type = 'king';
    this.board = board; 
    this.hasMoved = false; // Track if the king has moved (for castling)
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidMove = function(targetPosition) {
    let currentCol = this.position.charCodeAt(0) - 65; // Convert A-H to 0-7
    let currentRow = parseInt(this.position.charAt(1)) - 1; // Convert 1-8 to 0-7
    let targetCol = targetPosition.col.charCodeAt(0) - 65;
    let targetRow = parseInt(targetPosition.row) - 1;

    // Check if the move is within one square in any direction
    let colDiff = Math.abs(targetCol - currentCol);
    let rowDiff = Math.abs(targetRow - currentRow);

    if (colDiff > 1 || rowDiff > 1) {
        // Check for castling
        if (!this.hasMoved && currentRow === targetRow && Math.abs(targetCol - currentCol) === 2) {
            return this.canCastle(targetPosition);
        }
        console.warn("Invalid move for king: more than one square");
        return false;
    }

    // Check if there's a piece at the target position
    let pieceAtTarget = this.board.getPieceAt(targetPosition);
    if (pieceAtTarget) {
        if (pieceAtTarget.color === this.color) {
            console.warn("Invalid move for king: cannot capture own piece");
            return false;
        } else {
            return 'capture'; // Valid capture move
        }
    }

    return true; // Valid move
};

King.prototype.canCastle = function(targetPosition) {
    let direction = targetPosition.col > this.position[0] ? 1 : -1;
    let rookCol = direction === 1 ? 'H' : 'A';
    let rookRow = this.color === 'white' ? '1' : '8';
    let rook = this.board.getPieceAt({col: rookCol, row: rookRow});

    if (!rook || rook.type !== 'rook' || rook.hasMoved) {
        console.warn("Invalid castling: Rook has moved or is not in place");
        return false;
    }

    // Check if the path is clear
    let col = this.position.charCodeAt(0) - 65 + direction;
    let endCol = direction === 1 ? 6 : 2;
    while (col !== endCol) {
        if (this.board.getPieceAt({col: String.fromCharCode(col + 65), row: rookRow})) {
            console.warn("Invalid castling: Path is not clear");
            return false;
        }
        col += direction;
    }

    return 'castle';
};

King.prototype.moveTo = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true || result === 'capture') {
        // Move the king to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.hasMoved = true;
        this.render();
        return true;
    } else if (result === 'castle') {
        // Perform castling
        let direction = targetPosition.col > this.position[0] ? 1 : -1;
        let rookCol = direction === 1 ? 'H' : 'A';
        let rookRow = this.color === 'white' ? '1' : '8';
        let rook = this.board.getPieceAt({col: rookCol, row: rookRow});

        // Move the king
        this.position = targetPosition.col + targetPosition.row;
        this.hasMoved = true;
        this.render();

        // Move the rook
        let newRookCol = direction === 1 ? 'F' : 'D';
        rook.position = newRookCol + rookRow;
        rook.hasMoved = true;
        rook.render();

        return true;
    }
    return false; // Invalid move
};

King.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null;
};
