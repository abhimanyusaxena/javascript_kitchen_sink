var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.moveTo = function(targetPosition){
    console.log(`Attempting to move bishop from ${this.position} to ${targetPosition.col}${targetPosition.row}`);
    
    var isValidMove = this.isValidMove(targetPosition);
    if (!isValidMove) {
        console.log("Invalid move for bishop");
        return;
    }
    
    console.log("Move is valid. Proceeding with move.");
    
    // Check if there's a piece to kill
    var pieceAtTarget = this.Board.getPieceAt(targetPosition);
    if (pieceAtTarget) {
        console.log(`Piece found at target: ${pieceAtTarget.color} ${pieceAtTarget.type}`);
        if (pieceAtTarget.color !== this.color) {
            console.log("Attempting to kill piece");
            this.kill(pieceAtTarget);
        } else {
            console.log("Cannot kill own piece. Move aborted.");
            return;
        }
    } else {
        console.log("No piece at target position.");
    }
    
    var newPos = targetPosition.col + targetPosition.row;
    this.position = newPos;
    this.render();
    console.log(`Bishop successfully moved to ${this.position}`);
}

Bishop.prototype.isValidMove = function(targetPosition) {
    var currentRow = parseInt(this.position[1], 10);
    var targetRow = parseInt(targetPosition.row, 10);
    var currentCol = this.position[0].toUpperCase();
    var targetCol = targetPosition.col.toUpperCase();

    console.log(`Checking move from ${currentCol}${currentRow} to ${targetCol}${targetRow}`);

    if (Math.abs(currentRow - targetRow) !== Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0))) {
        console.log("Invalid move: Bishop must move diagonally");
        return false;
    }
    
    var rowStep = targetRow > currentRow ? 1 : -1;
    var colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;
    
    var currentCheckRow = currentRow + rowStep;
    var currentCheckCol = currentCol.charCodeAt(0) + colStep;

    while (currentCheckRow !== targetRow && currentCheckCol !== targetCol.charCodeAt(0)) {
        var intermediatePosition = {
            row: currentCheckRow.toString(),
            col: String.fromCharCode(currentCheckCol)
        };

        if (this.Board.getPieceAt(intermediatePosition)) {
            console.log(`Path blocked at ${intermediatePosition.col}${intermediatePosition.row}`);
            return false;
        }

        currentCheckRow += rowStep;
        currentCheckCol += colStep;
    }
    
    console.log("Move is valid");
    return true;
};

Bishop.prototype.kill = function(targetPiece) {
    console.log("Method not implemented by bishop");
    if (!targetPiece.$el) {
        console.error("Target piece does not have a DOM element.");
        return;
    }
    if (targetPiece.$el.parentNode) {
        targetPiece.$el.parentNode.removeChild(targetPiece.$el);
        console.log("Piece removed from the board.");
    }
    else {
        console.error("Cannot remove piece from board: no parent node.");
    }
    var pieceSet = targetPiece.color === 'white' ? this.Board.whitePieces : this.Board.blackPieces;
    for (var pieceType in pieceSet) {
        if (Array.isArray(pieceSet[pieceType])) {
            var initialLength = pieceSet[pieceType].length;
            pieceSet[pieceType] = pieceSet[pieceType].filter(piece => piece !== targetPiece);
            if (pieceSet[pieceType].length < initialLength) {
                console.log(`${targetPiece.type} removed from ${targetPiece.color} pieces array.`);
            }
        } else if (pieceSet[pieceType] === targetPiece) {
            delete pieceSet[pieceType];
            console.log(`${targetPiece.type} removed from ${targetPiece.color} pieces object.`);
        }
    }
    
    
    
};
// console.log(`${this.color} bishop attempting to kill ${targetPiece.color} ${targetPiece.type} at ${targetPiece.position}`);
    
//     if (!targetPiece.$el) {
//         console.error("Target piece does not have a DOM element.");
//         return;
//     }
    
//     // Remove the killed piece from the board
//     if (targetPiece.$el.parentNode) {
//         targetPiece.$el.parentNode.removeChild(targetPiece.$el);
//         console.log("Piece removed from the board.");
//     } else {
//         console.error("Cannot remove piece from board: no parent node.");
//     }
    
//     // Remove the killed piece from the game state
//     var pieceSet = targetPiece.color === 'white' ? this.Board.whitePieces : this.Board.blackPieces;
//     for (var pieceType in pieceSet) {
//         if (Array.isArray(pieceSet[pieceType])) {
//             var initialLength = pieceSet[pieceType].length;
//             pieceSet[pieceType] = pieceSet[pieceType].filter(piece => piece !== targetPiece);
//             if (pieceSet[pieceType].length < initialLength) {
//                 console.log(`${targetPiece.type} removed from ${targetPiece.color} pieces array.`);
//             }
//         } else if (pieceSet[pieceType] === targetPiece) {
//             delete pieceSet[pieceType];
//             console.log(`${targetPiece.type} removed from ${targetPiece.color} pieces object.`);
//         }
//     }
    
//     console.log("Kill operation completed.");
