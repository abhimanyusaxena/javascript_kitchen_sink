var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};



Bishop.prototype = new Piece({});

Bishop.prototype.moveTo = function(newPosition){
    if (this.isValid(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
};

Bishop.prototype.isValid = function(targetPosition) {
    let currentCol = this.position.charAt(0); 
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col; 
    let targetRow = targetPosition.row;
    //let targetPiece = this.board.getPieceAt(targetPosition);

    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow)) {
        let directionCol = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;
        let directionRow = targetRow > currentRow ? 1 : -1;
        let checkCol = currentCol.charCodeAt(0) + directionCol;
        let checkRow = currentRow + directionRow;

        while (checkCol !== targetCol.charCodeAt(0) && checkRow !== targetRow) {
            let positionToCheck = String.fromCharCode(checkCol) + checkRow;
            // if (this.board.getPieceAt({ col: String.fromCharCode(checkCol), row: checkRow })) {
            //     console.warn("Invalid move for bishop: Path is blocked");
            //     return false;
            // }
            checkCol += directionCol;
            checkRow += directionRow;
        }

        // if (targetPiece!=false && targetPiece.color !== this.color) {
        //     //targetPiece.kill(targetPiece);
        // }
        return true;
    }

    console.warn("Invalid move for bishop");
    return false;
};