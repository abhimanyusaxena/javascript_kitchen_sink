var King = function(config){
    this.type = 'king';
    Piece.call(this, config); 
};

King.prototype = Object.create(Piece.prototype); 
King.prototype.constructor = King; 

King.prototype.isValidPosition = function(targetPosition){
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Calculate the difference between the target and current positions
    let colDifference = Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDifference = Math.abs(targetPosition.row - currentRow);

    // The King can move exactly one square in any direction
    if (colDifference <= 1 && rowDifference <= 1) {
        return true;
    }

    // If the move is outside the range of one square, it's invalid
    console.warn("Invalid move for king");
    return false;
}

King.prototype.moveTo = function(targetPosition){
    // Ensure the move is valid
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else {
        //NOOP
    }
}
