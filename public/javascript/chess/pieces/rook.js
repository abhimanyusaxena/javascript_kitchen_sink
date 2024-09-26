var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    if (currentCol === targetCol || currentRow === targetRow) {
        return true;
    }

    console.warn("Invalid move for rook");
    return false;
};

Rook.prototype.moveTo = function(newPosition) {
    if (this.isValidPosition(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
    } else {
        console.warn("Move is invalid");
    }
};