var Board = function(config){
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.turn = 'black'; // White moves first
    this.selectedPiece = null;
    this.generateBoardDom();
    this.addListeners();
    this.initiateGame();
    this.renderAllPieces();
}

Board.prototype.addListeners = function(){
    this.$el.addEventListener('click', this.boardClicked.bind(this));
}

Board.prototype.generateBoardDom = function(config){
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

Board.prototype.getClickedBlock = function(clickEvent){
    const clickedCell = clickEvent.target.closest('li');
        
    if (clickedCell) {
        const row = clickedCell.getAttribute('data-row');
        const parentLi = clickedCell.closest('li[data-col]');
        const col = parentLi ? parentLi.getAttribute('data-col') : null;
        
        if (row !== null && col !== null) {
            return { row: row, col: col };
        }
    }
    return null;
}

Board.prototype.clearSelection = function(){
    const allPieces = document.querySelectorAll('.piece');
    allPieces.forEach(piece => {
        piece.classList.remove('selected');
    });
};



Board.prototype.boardClicked = function(event) {    
    this.clearSelection();
    
    const clickedCell = this.getClickedBlock(event);
    if (!clickedCell) return;
    
    const selectedPiece = this.getPieceAt(clickedCell);
    
    // If a piece is clicked
    if (selectedPiece) {
        // Check if it's the current player's turn
        if (selectedPiece.color !== this.turn) {
            console.warn(`It's ${this.turn}'s turn`);
            return; // Don't select or move the wrong piece
        }
        this.selectPiece(event.target, selectedPiece);
    } 
    // No piece is selected, try to move the selected piece
    else if (this.selectedPiece) {
        // Get the piece at the destination
        const destinationPiece = this.getPieceAt(clickedCell);
        
        // If there's no piece in the clicked cell or it's an opponent's piece
        if (!destinationPiece || destinationPiece.color !== this.selectedPiece.color) {
            // Capture the opponent's piece, if present
            if (destinationPiece && destinationPiece.color !== this.selectedPiece.color) {
                this.capturePiece(destinationPiece);
            }

            // Move the selected piece if the move is valid and switch turns
            if (this.selectedPiece.moveTo(clickedCell)) {
                this.switchTurn();
                this.deselectPiece(); // Deselect after moving
            }
        }
    }
};


Board.prototype.deselectPiece = function() {
    if (this.selectedPiece) {
        // Remove the 'selected' class from the currently selected piece
        const selectedElement = document.querySelector(`.piece[data-position="${this.selectedPiece.position}"]`);
        if (selectedElement) {
            selectedElement.classList.remove('selected');
        }

        // Clear the selected piece reference
        this.selectedPiece.selected = false;
        this.selectedPiece = null; // Reset selected piece
    }
};


Board.prototype.capturePiece = function(piece) {
    // Remove the captured piece from the board and its respective collection
    const position = piece.position;
    
    // Remove from whitePieces if it's a white piece
    if (piece.color === 'white') {
        for (let type in this.whitePieces) {
            if (Array.isArray(this.whitePieces[type])) {
                this.whitePieces[type] = this.whitePieces[type].filter(p => p.position !== position);
            } else if (this.whitePieces[type].position === position) {
                delete this.whitePieces[type];
            }
        }
    }

    // Remove from blackPieces if it's a black piece
    if (piece.color === 'black') {
        for (let type in this.blackPieces) {
            if (Array.isArray(this.blackPieces[type])) {
                this.blackPieces[type] = this.blackPieces[type].filter(p => p.position !== position);
            } else if (this.blackPieces[type].position === position) {
                delete this.blackPieces[type];
            }
        }
    }
    
    // Visually remove the piece from the board
    const pieceElement = document.querySelector(`.piece[data-position="${piece.position}"]`);
    if (pieceElement) {
        pieceElement.remove();
    }

    console.log(`${piece.color} ${piece.constructor.name} captured at ${position}`);
};





Board.prototype.getPieceAt = function(cell){
    if (!cell || !cell.row || !cell.col) return false;

    const position = cell.col + cell.row;

    // Check white pieces
    for (let pieceType in this.whitePieces) {
        if (Array.isArray(this.whitePieces[pieceType])) {
            for (let piece of this.whitePieces[pieceType]) {
                if (piece.position === position) return piece;
            }
        } else {
            if (this.whitePieces[pieceType].position === position) return this.whitePieces[pieceType];
        }
    }

    // Check black pieces
    for (let pieceType in this.blackPieces) {
        if (Array.isArray(this.blackPieces[pieceType])) {
            for (let piece of this.blackPieces[pieceType]) {
                if (piece.position === position) return piece;
            }
        } else {
            if (this.blackPieces[pieceType].position === position) return this.blackPieces[pieceType];
        }
    }

    return false;
}

Board.prototype.selectPiece = function(clickedElement, selectedPiece) {
    if (clickedElement.classList.contains('piece')) {
        clickedElement.classList.add('selected');
    } else {
        const parentElement = clickedElement.closest('.piece');
        if (parentElement) {
            parentElement.classList.add('selected');
        }
    }
    selectedPiece.selected = true;
    this.selectedPiece = selectedPiece;
}

Board.prototype.switchTurn = function() {
    this.turn = this.turn === 'white' ? 'black' : 'white';
    console.log(`It's now ${this.turn}'s turn`);
}

Board.prototype.initiateGame = function() {
    // Create white pieces
    this.whitePieces = {
        king: new King({ color: 'white', position: 'E1' }),
        queen: new Queen({ color: 'white', position: 'D1' }),
        bishops: [
            new Bishop({ color: 'white', position: 'C1' }),
            new Bishop({ color: 'white', position: 'F1' })
        ],
        knights: [
            new Knight({ color: 'white', position: 'B1' }),
            new Knight({ color: 'white', position: 'G1' })
        ],
        rooks: [
            new Rook({ color: 'white', position: 'A1' }),
            new Rook({ color: 'white', position: 'H1' })
        ],
        pawns: []
    };

    for (let i = 0; i < 8; i++) {
        this.whitePieces.pawns.push(new Pawn({ color: 'white', position: String.fromCharCode(65 + i) + '2' }));
    }

    // Create black pieces
    this.blackPieces = {
        king: new King({ color: 'black', position: 'E8' }),
        queen: new Queen({ color: 'black', position: 'D8' }),
        bishops: [
            new Bishop({ color: 'black', position: 'C8' }),
            new Bishop({ color: 'black', position: 'F8' })
        ],
        knights: [
            new Knight({ color: 'black', position: 'B8' }),
            new Knight({ color: 'black', position: 'G8' })
        ],
        rooks: [
            new Rook({ color: 'black', position: 'A8' }),
            new Rook({ color: 'black', position: 'H8' })
        ],
        pawns: []
    };

    for (let i = 0; i < 8; i++) {
        this.blackPieces.pawns.push(new Pawn({ color: 'black', position: String.fromCharCode(65 + i) + '7' }));
    }
};

Board.prototype.renderAllPieces = function() {
    Object.values(this.whitePieces).forEach(piece => {
        if (Array.isArray(piece)) {
            piece.forEach(p => p.render());
        } else {
            piece.render();
        }
    });

    Object.values(this.blackPieces).forEach(piece => {
        if (Array.isArray(piece)) {
            piece.forEach(p => p.render());
        } else {
            piece.render();
        }
    });
};
