var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
  };
  
  // Inherit from the Piece class
  Bishop.prototype = Object.create(Piece.prototype);
  
  // Define moveTo method for Bishop
  Bishop.prototype.moveTo = function(newPosition) {
    if (this.isValidPosition(newPosition)) {
      this.position = newPosition.col + newPosition.row;
      this.render();
    } else {
      throw new Error("Invalid Bishop move");
    }
  };
  
  // Define isValidPosition method to check for diagonal moves
  Bishop.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to integer column and row values
    let currentCol = this.position.charAt(0).charCodeAt(0) - 64;
    let currentRow = parseInt(this.position.charAt(1));
  
    // Convert target position to integer column and row values
    let targetCol = targetPosition.col.charCodeAt(0) - 64;
    let targetRow = parseInt(targetPosition.row);
  
    // Check if the move is diagonal (valid for bishop)
    if (Math.abs(targetCol - currentCol) === Math.abs(targetRow - currentRow)) {
      // Determine the direction of movement for both row and column
      let colStep = currentCol > targetCol ? -1 : 1;
      let rowStep = currentRow < targetRow ? 1 : -1;
  
      // Move step-by-step towards the target, checking each position
      currentCol += colStep;
      currentRow += rowStep;
  
      while (currentCol !== targetCol && currentRow !== targetRow) {
        // Create position object for the current step in the path
        let position = {
          row: currentRow.toString(),
          col: String.fromCharCode(currentCol + 64)
        };
  
        // Check if there's any piece in the current position
        let piece = this.board.getPieceAt(position);
  
        // If a piece is found, the move is blocked and thus invalid
        if (piece) {
          throw new Error("Invalid move: Path is blocked");
        }
  
        // Continue moving in the same direction
        currentCol += colStep;
        currentRow += rowStep;
      }
  
      // If no pieces block the path, the move is valid
      return true;
    }
  
    // If the move is not diagonal, it's invalid for a bishop
    return false;
  };
  