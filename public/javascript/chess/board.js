var Board = function(config) {
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.currentTurn = 'white';
    this.selectedPiece = null; // Initialize selectedPiece
    this.generateBoardDom();
    this.addListeners();
    this.initiateGame(); // Start the game
}

Board.prototype.addListeners = function() {
    this.$el.addEventListener('click', this.boardClicked.bind(this));
}

Board.prototype.generateBoardDom = function() {
    let boardHTML = '<ul id="game-ct">';
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let col of columns) {
        boardHTML += `<li data-col="${col}"><ul>`;
        for (let row = 1; row <= 8; row++) {
            boardHTML += `<li data-row="${row}"></li>`;
        }
        boardHTML += '</ul></li>';
    }

    boardHTML += '</ul>';

    this.$el.innerHTML = boardHTML;    
}

Board.prototype.getClickedBlock = function(clickEvent) {
    const clickedCell = clickEvent.target.closest('li[data-row]');
        
    if (clickedCell) {
        const row = clickedCell.getAttribute('data-row');
        const parentLi = clickedCell.closest('li[data-col]');
        const col = parentLi ? parentLi.getAttribute('data-col') : null;
        
        if (row !== null && col !== null) {
            return { row: row, col: col };
        } else {
            console.warn('Unable to determine block coordinates');
        }
    } else {
        console.warn('Clicked element is not within a board square');
    }
}
Board.prototype.clearSelection = function() {
    // Deselect all currently selected pieces
    const selectedPieces = document.querySelectorAll('.selected');
    selectedPieces.forEach(piece => {
        piece.classList.remove('selected');
    });

    this.selectedPiece = null; // Reset the selected piece
};

Board.prototype.boardClicked = function(event) {    
    const clickedCell = this.getClickedBlock(event);
    if (!clickedCell) return; // Exit if click was not on a valid cell

    const piece = this.getPieceAt(clickedCell);

    if (this.selectedPiece) { // If a piece is already selected
        if (piece) {
            // If the player clicks on a piece of the same color, allow reselection
            if (piece.color === this.selectedPiece.color) {
                console.log(`Reselecting your own piece.`);
                this.selectPiece(event.target, piece); // Reselect the new piece
                return; 
            } else {
                // If clicked on an opponent's piece, validate move before capturing
                const targetPosition = { row: clickedCell.row, col: clickedCell.col };
                const isValidMove = this.selectedPiece.isValidMove(targetPosition);

                if (!isValidMove) {
                    console.log('Invalid move, try again.');
                    return; // Do not switch turns or move the piece if invalid move
                }

                // Valid move, so capture the opponent's piece
                this.selectedPiece.moveTo(clickedCell);
                this.clearSelection();
                this.switchTurn(); // Switch turn after a valid move
            }
        } else {
            // Empty cell clicked, validate move and proceed
            const targetPosition = { row: clickedCell.row, col: clickedCell.col };
            const isValidMove = this.selectedPiece.isValidMove(targetPosition);

            if (!isValidMove) {
                console.log('Invalid move, try again.');
                return; // Do not switch turns or move the piece if invalid move
            }

            // Move the selected piece to the new position
            this.selectedPiece.moveTo(clickedCell);
            this.clearSelection();
            this.switchTurn(); // Switch turn after a valid move
        }
    } else {
        if (piece) {
            // Select the piece if it's the player's turn
            if (piece.color === this.currentTurn) {
                this.selectPiece(event.target, piece);
            } else {
                console.log(`It's ${this.currentTurn}'s turn! You cannot select an opponent's piece.`);
            }
        }
    }
}



Board.prototype.getPieceAt = function(cell) {
    if (!cell || !cell.row || !cell.col) {
        return false;
    }

    const position = cell.col + cell.row;

    // Check white pieces
    for (let pieceType in this.whitePieces) {
        const pieceArray = Array.isArray(this.whitePieces[pieceType]) ? this.whitePieces[pieceType] : [this.whitePieces[pieceType]];
        for (let piece of pieceArray) {
            if (piece.position === position) {
                return piece;
            }
        }
    }

    // Check black pieces
    for (let pieceType in this.blackPieces) {
        const pieceArray = Array.isArray(this.blackPieces[pieceType]) ? this.blackPieces[pieceType] : [this.blackPieces[pieceType]];
        for (let piece of pieceArray) {
            if (piece.position === position) {
                return piece;
            }
        }
    }
    return false;
}

Board.prototype.switchTurn = function() {
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    console.log(`It's now ${this.currentTurn}'s turn!`);
}

Board.prototype.selectPiece = function(clickedElement, selectedPiece) {
    // First clear any existing selection
    this.clearSelection();

    // Highlight the new selected piece only
    if (clickedElement.classList.contains('piece')) {
        clickedElement.classList.add('selected');
    } else {
        const parentElement = clickedElement.closest('.piece');
        if (parentElement) {
            parentElement.classList.add('selected');
        }
    }

    selectedPiece.selected = true;
    this.selectedPiece = selectedPiece; // Set the selected piece
}

Board.prototype.initiateGame = function() {
    // Create white pieces
    this.whitePieces = {
        king: new King({ color: 'white', position: 'D1', board: this }),
        queen: new Queen({ color: 'white', position: 'E1', board: this }),
        bishops: [
            new Bishop({ color: 'white', position: 'C1', board: this }),
            new Bishop({ color: 'white', position: 'F1', board: this })
        ],
        knights: [
            new Knight({ color: 'white', position: 'B1', board: this }),
            new Knight({ color: 'white', position: 'G1', board: this })
        ],
        rooks: [
            new Rook({ color: 'white', position: 'A1', board: this }),
            new Rook({ color: 'white', position: 'H1', board: this })
        ],
        pawns: []
    };

    // Create white pawns
    for (let i = 0; i < 8; i++) {
        this.whitePieces.pawns.push(new Pawn({ color: 'white', position: String.fromCharCode(65 + i) + '2', board: this }));
    }

    // Create black pieces
    this.blackPieces = {
        king: new King({ color: 'black', position: 'D8', board: this }),
        queen: new Queen({ color: 'black', position: 'E8', board: this }),
        bishops: [
            new Bishop({ color: 'black', position: 'C8', board: this }),
            new Bishop({ color: 'black', position: 'F8', board: this })
        ],
        knights: [
            new Knight({ color: 'black', position: 'B8', board: this }),
            new Knight({ color: 'black', position: 'G8', board: this })
        ],
        rooks: [
            new Rook({ color: 'black', position: 'A8', board: this }),
            new Rook({ color: 'black', position: 'H8', board: this })
        ],
        pawns: []
    };

    // Create black pawns
    for (let i = 0; i < 8; i++) {
        this.blackPieces.pawns.push(new Pawn({ color: 'black', position: String.fromCharCode(65 + i) + '7', board: this }));
    }

    // Render all pieces after initiating the game
    this.renderAllPieces();
};

Board.prototype.renderAllPieces = function() {
    // Render white pieces
    Object.values(this.whitePieces).forEach(piece => {
        if (Array.isArray(piece)) {
            piece.forEach(p => p.render());
        } else {
            piece.render();
        }
    });

    // Render black pieces
    Object.values(this.blackPieces).forEach(piece => {
        if (Array.isArray(piece)) {
            piece.forEach(p => p.render());
        } else {
            piece.render();
        }
    });
};
