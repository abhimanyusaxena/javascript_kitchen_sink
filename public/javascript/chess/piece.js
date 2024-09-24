var Piece = function(config){
    this.position = config.position;
    this.color = config.color;
    this.board = config.board;
    this.currentTurn = config.currentTurn;
    if(this.position){
        this.render();        
    }    
}
Piece.prototype.moveTo = function(targetPosition){
    console.log("Method not implemeted by: " + this.type);
}


Piece.prototype.attachListeners = function(){
    //To be implemented
}

Piece.prototype.render = function(){
    var col = this.position[0];
    var row = this.position[1];
    // Find the li element with matching data-col and data-row attributes
    var element = document.querySelector(`[data-col="${col}"] [data-row="${row}"]`);
    if (element) {  
        // Remove the existing piece element from the DOM if it exists
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        // Create a new div element to represent the piece
        var pieceElement = document.createElement('div');
        
        // Add classes to the new element for styling
        pieceElement.classList.add('piece', this.color, this.type);
        
        // Clear any existing content in the cell
        element.innerHTML = '';
        
        // Append the new piece element to the cell
        element.appendChild(pieceElement);
        this.$el = pieceElement;
        this.attachListeners();
    } else {
        console.warn(`Element not found for position: ${this.position}`);
    }
}

Piece.prototype.kill = function(targetPiece) {
    if (targetPiece) {
        const targetPosition = targetPiece.position;
        const targetElement = document.querySelector(`[data-col="${targetPosition[0]}"] [data-row="${targetPosition[1]}"]`);
        targetElement.innerHTML = ''; // Remove the target piece from the board
        
        // Remove the target piece from the appropriate pieces object
        if (targetPiece.color === 'white') {
            for (let pieceType in this.board.whitePieces) {
                const pieceArray = Array.isArray(this.board.whitePieces[pieceType]) ? this.board.whitePieces[pieceType] : [this.board.whitePieces[pieceType]];
                const index = pieceArray.indexOf(targetPiece);
                if (index !== -1) {
                    pieceArray.splice(index, 1);
                    break;
                }
            }
        } else {
            for (let pieceType in this.board.blackPieces) {
                const pieceArray = Array.isArray(this.board.blackPieces[pieceType]) ? this.board.blackPieces[pieceType] : [this.board.blackPieces[pieceType]];
                const index = pieceArray.indexOf(targetPiece);
                if (index !== -1) {
                    pieceArray.splice(index, 1);
                    break;
                }
            }
        }
    }
};