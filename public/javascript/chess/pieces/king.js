var King = function (config) {
    this.type = "king";
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.kill = function (targetPiece) {
    const targetPosition = targetPiece.position;
    const targetElement = document.querySelector(
        `[data-col="${targetPosition[0]}"] [data-row="${targetPosition[1]}"]`
    );
    targetElement.innerHTML = ""; // Remove the target piece from the board

    console.log("King killed " + targetPiece.type);
};
King.prototype.isValidMove = function (targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the target position row and column
    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row;

    // Calculate the difference in rows and columns
    let rowDifference = Math.abs(targetRow - currentRow);
    let colDifference = Math.abs(
        targetCol.charCodeAt(0) - currentCol.charCodeAt(0)
    );

    // King can move one square in any direction (horizontal, vertical, or diagonal)
    if (rowDifference <= 1 && colDifference <= 1) {
        return true; // Valid king move
    }

    // If none of the conditions are met, the move is invalid
    console.warn("Invalid move for king");
    return false;
};

King.prototype.moveTo = function (targetPosition) {
    if (this.board.currentTurn !== this.color) {
        console.log("Invalid move: Not your turn");
        return;
    }
    if (
        this.isValidMove(targetPosition) &&
        this.board.getPieceAt(targetPosition) !== null &&
        this.board.getPieceAt(targetPosition).color !== this.color
    ) 
    if (this.isValidMove(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    } else {
        console.log("Invalid move for king");
    }
};
