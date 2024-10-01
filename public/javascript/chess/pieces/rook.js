var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(board, targetPosition) {
    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row;

    let validCells = this.getValidCells(board, targetPosition);
    return validCells.includes(targetCol + targetRow);
}

Rook.prototype.getValidCells = function(board) {
    let upCells = this.getValidUpCells(board);
    let downCells = this.getValidDownCells(board);
    let rightCells = this.getValidRightCells(board);
    let leftCells = this.getValidLeftCells(board);
    return [...upCells, ...downCells, ...leftCells, ...rightCells];
}

Rook.prototype.getValidLeftCells = function(board) {
    let rows = "12345678";
    let cols = "ABCDEFGH";
    
    let row = rows.indexOf(this.position[1]);
    let startCol = cols.indexOf(this.position[0]);
    let endCol = 0;

    let validCells = [];

    for (let col = startCol; col >= endCol; col--) {
        let cellPosition = {
            row: rows[row],
            col: cols[col]
        };
        
        if (cellPosition.col + cellPosition.row == this.position) {
            continue;
        }
        
        let piece = board.getPieceAt(cellPosition);
        if (piece && piece.isColor(this.color)) {
            break;
        }
        
        validCells.push(cellPosition.col + cellPosition.row);
        if (piece) {
            break;
        }
    }

    return validCells;
}

Rook.prototype.getValidUpCells = function(board) {
    let rows = "12345678";
    let cols = "ABCDEFGH";
    
    let col = cols.indexOf(this.position[0]);
    let startRow = rows.indexOf(this.position[1]);
    let endRow = 0;

    let validCells = [];

    for (let row = startRow; row >= endRow; row--) {
        let cellPosition = {
            row: rows[row],
            col: cols[col]
        };
        
        if (cellPosition.col + cellPosition.row == this.position) {
            continue;
        }
        
        let piece = board.getPieceAt(cellPosition);
        if (piece && piece.isColor(this.color)) {
            break;
        }
        
        validCells.push(cellPosition.col + cellPosition.row);
        if (piece) {
            break;
        }
    }

    return validCells;
}

Rook.prototype.getValidDownCells = function(board) {
    let rows = "12345678";
    let cols = "ABCDEFGH";
    
    let col = cols.indexOf(this.position[0]);
    let startRow = rows.indexOf(this.position[1]);
    let endRow = 7;

    let validCells = [];

    for (let row = startRow; row <= endRow; row++) {
        let cellPosition = {
            row: rows[row],
            col: cols[col]
        };
        
        if (cellPosition.col + cellPosition.row == this.position) {
            continue;
        }
        
        let piece = board.getPieceAt(cellPosition);
        if (piece && piece.isColor(this.color)) {
            break;
        }
        
        validCells.push(cellPosition.col + cellPosition.row);
        if (piece) {
            break;
        }
    }

    return validCells;
}

Rook.prototype.getValidRightCells = function(board) {
    let rows = "12345678";
    let cols = "ABCDEFGH";
    
    let row = rows.indexOf(this.position[1]);
    let startCol = cols.indexOf(this.position[0]);
    let endCol = 7;

    let validCells = [];

    for (let col = startCol; col <= endCol; col++) {
        let cellPosition = {
            row: rows[row],
            col: cols[col]
        };

        if (cellPosition.col + cellPosition.row == this.position) {
            continue;
        }
        
        console.log(this.position, cellPosition.col + cellPosition.row);

        let piece = board.getPieceAt(cellPosition);
        if (piece && piece.isColor(this.color)) {
            break;
        }
            
        validCells.push(cellPosition.col + cellPosition.row);
        if (piece) {
            break;
        }
    }

    return validCells;
}

Rook.prototype.moveTo = function(newPosition, board){
    let isValidMove = this.isValidPosition(board, newPosition);

    if (!isValidMove) {
        console.warn("Invalid move for rook");
        return;
    }

    this.position = newPosition.col + newPosition.row;
    this.render();
}