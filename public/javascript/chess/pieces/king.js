var King = function(config) {
    this.type = 'king';
    this.color = config.color; // Ensure color is set from config
    this.position = config.position; // Set initial position from config
    this.hasMoved = false; // Track if the king has moved
    Piece.call(this, config); // Call the parent constructor
};

// Inheritance
Object.setPrototypeOf(King.prototype, Piece.prototype);
King.prototype.constructor = King;



// check for valid postions
King.prototype.isValidPosition = function(newPos) {
    if (!this.position || !newPos || !newPos.col || !newPos.row) {
        console.warn("Invalid input: missing position data");
        return false;
    }

    let currCol = this.position.charAt(0);
    let currRow = parseInt(this.position.charAt(1));

    let newCol = newPos.col;
    let newRow = parseInt(newPos.row);

    // Ensure newCol and currCol are valid before proceeding
    if (typeof currCol === 'undefined' || typeof newCol === 'undefined') {
        console.warn("Invalid column data in position");
        return false;
    }

    // calculate differences
    let colDiff = Math.abs(newCol.charCodeAt(0) - currCol.charCodeAt(0));
    let rowDiff = Math.abs(newRow - currRow);

    // the difference shouldnt be more then 1 in row or in col
    if (colDiff <= 1 && rowDiff <= 1 && (colDiff + rowDiff > 0)) {
        return true;
    }

    console.warn("Invalid move for king");
    return false;
};

// Move the King to a new position
King.prototype.moveTo = function(newPos) {
    if (this.isValidPosition(newPos)) {
        this.position = newPos.col + newPos.row;
        this.render();
        this.hasMoved = true; // Mark the king as moved
    } else {
        console.warn("Move to invalid position");
    }
};

// Render the King 
King.prototype.render = function() {
    Piece.prototype.render.call(this);
    if (this.$el) {
        this.$el.textContent = this.color === 'white' ? '♔' : '♚';
    }
};
