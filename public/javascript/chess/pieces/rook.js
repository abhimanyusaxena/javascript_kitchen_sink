var Rook = function (config) {
    this.type = "rook";
    this.constructor(config);
};
Rook.prototype = new Piece({});
Rook.prototype.kill = function (targetPiece) {
    const targetPosition = targetPiece.position;
    const targetElement = document.querySelector(
        `[data-col="${targetPosition[0]}"] [data-row="${targetPosition[1]}"]`
    );
    targetElement.innerHTML = ""; 
    Piece.prototype.kill.call(this, targetPiece);
    console.log("Rook killed " + targetPiece.type);
};
Rook.prototype.isValidMove = function (targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);
    let colDifference = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetRow - currentRow);
    if (colDifference !== 0 && rowDifference !== 0) {
        console.warn("Invalid move for rook: Rook must move in a straight line.");
        return false;
    }
    if (!this.isPathCheck(currentCol, currentRow, targetCol, targetRow)) {
        console.warn("Path is not clear for rook.");
        return false;
    }
    return true;
};
Rook.prototype.isPathCheck = function (currentCol, currentRow, targetCol, targetRow) {
    let colStep = 0;
    let rowStep = 0;
    if (currentCol === targetCol) {
        rowStep = targetRow > currentRow ? 1 : -1;
    } else {
        colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;
    }
    let col = currentCol.charCodeAt(0) + colStep;
    let row = currentRow + rowStep;
    while ((String.fromCharCode(col) !== targetCol) || (row !== targetRow)) {
        let checkPosition = {
            col: String.fromCharCode(col),
            row: row.toString()
        };
        if (this.board.getPieceAt(checkPosition)) {
            return false;
        }
        col += colStep;
        row += rowStep;
    }
    return true; 
};
Rook.prototype.moveTo = function (targetPosition) {
    if (this.board.currentTurn !== this.color) {
        console.log("Invalid move: Not your turn");
        return;
    }
    if (this.isValidMove(targetPosition)) {
        let targetPiece = this.board.getPieceAt(targetPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            this.kill(targetPiece);
        }
        this.position = targetPosition.col + targetPosition.row; 
        this.render();
        console.log(`Rook moved to ${this.position}`);
    } else {
        console.log("Invalid move for rook");
    }
};