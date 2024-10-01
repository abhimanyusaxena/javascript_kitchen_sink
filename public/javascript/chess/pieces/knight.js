var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidPosition = function(board, targetPosition) {
    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row;

    let validCells = this.getValidCells(board, targetPosition);
    return validCells.includes(targetCol + targetRow);
}

Knight.prototype.getValidCells = function(board) {
    let rows = "12345678";
    let cols = "ABCDEFGH";

    let posConfigs = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [2, -1],
        [1, -2],
        [-2, 1],
        [-1, -2],
        [-2, -1]
    ];

    let row = rows.indexOf(this.position[1]);
    let col = cols.indexOf(this.position[0]);

    let validCells = [];
    
    for (let posConfig of posConfigs) {
        let newRow = posConfig[0] + row;
        let newCol = posConfig[1] + col;
        
        if (newRow < 0 || newRow > 7) {
            continue;
        }
        
        if (newCol < 0 || newCol > 7) {
            continue;
        }
        
        let cellPosition = {
            row: rows[newRow],
            col: cols[newCol]
        };
        
        let piece = board.getPieceAt(cellPosition);

        if (piece && piece.isColor(this.color)) {
            continue;
        }

        validCells.push(cellPosition.col + cellPosition.row);
    }
    
    return validCells;
}

Knight.prototype.moveTo = function(newPosition, board){
    let isValidMove = this.isValidPosition(board, newPosition);

    if (!isValidMove) {
        console.warn("Invalid move for knight");
        return;
    }

    this.position = newPosition.col + newPosition.row;
    this.render();
}