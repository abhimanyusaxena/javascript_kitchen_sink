var King = function(config) {
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let allowedMoves = [
        { col: currentCol, row: (currentRow + 1).toString() },
        { col: currentCol, row: (currentRow - 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: currentRow.toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: currentRow.toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: (currentRow + 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: (currentRow + 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) + 1), row: (currentRow - 1).toString() },
        { col: String.fromCharCode(currentCol.charCodeAt(0) - 1), row: (currentRow - 1).toString() },
    ];

    for (let move of allowedMoves) {
        if (move.col === targetPosition.col && move.row === targetPosition.row) {
            return true;
        }
    }

    console.warn("Invalid move for king");
    return false;
}

King.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }
}
