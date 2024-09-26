var Board = function(config) {
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.currentTurn = 'white';
    this.selectedPiece = null;
    this.generateBoardDom();
    this.addListeners();
};

Board.prototype.addListeners = function() {
    this.$el.addEventListener('click', this.boardClicked.bind(this));
};

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
};

Board.prototype.getClickedBlock = function(clickEvent) {
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
};

Board.prototype.clearSelection = function() {
    const selectedElements = this.$el.querySelectorAll('.selected');
    selectedElements.forEach(el => el.classList.remove('selected'));
    this.selectedPiece = null;
};


Board.prototype.boardClicked = function(event) {
    const clickedCell = this.getClickedBlock(event);

    if (!clickedCell) return; // If the click is not on a valid block

    // Check if a piece is already selected
    if (this.selectedPiece) {
        // Attempt to move the piece
        if (this.selectedPiece.color === this.currentTurn) {
            const validMove = this.selectedPiece.moveTo(clickedCell);
            if (validMove) {
                this.switchTurn();
                this.clearSelection();
            } else {
                console.warn("Invalid move. Try again.");
                this.clearSelection(); // Deselect the piece on invalid move
            }
        } else {
            console.warn(`It's ${this.currentTurn}'s turn!`);
        }
    } else {
        // Select a new piece
        const selectedPiece = this.getPieceAt(clickedCell);
        if (selectedPiece && selectedPiece.color === this.currentTurn) {
            this.selectPiece(event.target, selectedPiece);
        } else {
            console.warn(`It's ${this.currentTurn}'s turn!`);
        }
    }
};

Board.prototype.switchTurn = function() {
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    console.log(`Turn: ${this.currentTurn}`);
};



Board.prototype.getPieceAt = function(cell) {
    if (!cell || !cell.row || !cell.col) return false;

    const position = cell.col + cell.row;

    // Check white and black pieces
    const allPieces = [...Object.values(this.whitePieces), ...Object.values(this.blackPieces)];
    for (let pieceType of allPieces) {
        if (Array.isArray(pieceType)) {
            for (let piece of pieceType) {
                if (piece.position === position) return piece;
            }
        } else if (pieceType.position === position) {
            return pieceType;
        }
    }
    return false;
};



Board.prototype.selectPiece = function(clickedElement, selectedPiece) {
    this.clearSelection();
    clickedElement.classList.add('selected');
    this.selectedPiece = selectedPiece;
};





Board.prototype.initiateGame = function() {
    // Create white pieces
    this.whitePieces = {
        king: new King({ color: 'white', position: 'E1' }, this),
        queen: new Queen({ color: 'white', position: 'D1' }, this),
        bishops: [
            new Bishop({ color: 'white', position: 'C1' }, this),
            new Bishop({ color: 'white', position: 'F1' }, this)
        ],
        knights: [
            new Knight({ color: 'white', position: 'B1' }, this),
            new Knight({ color: 'white', position: 'G1' }, this)
        ],
        rooks: [
            new Rook({ color: 'white', position: 'A1' }, this),
            new Rook({ color: 'white', position: 'H1' }, this)
        ],
        pawns: []
    };

    // Create white pawns with a reference to the board
    for (let i = 0; i < 8; i++) {
        this.whitePieces.pawns.push(new Pawn({ color: 'white', position: String.fromCharCode(65 + i) + '2' }, this));
    }

    // Create black pieces similarly
    this.blackPieces = {
        king: new King({ color: 'black', position: 'E8' }, this),
        queen: new Queen({ color: 'black', position: 'D8' }, this),
        bishops: [
            new Bishop({ color: 'black', position: 'C8' }, this),
            new Bishop({ color: 'black', position: 'F8' }, this)
        ],
        knights: [
            new Knight({ color: 'black', position: 'B8' }, this),
            new Knight({ color: 'black', position: 'G8' }, this)
        ],
        rooks: [
            new Rook({ color: 'black', position: 'A8' }, this),
            new Rook({ color: 'black', position: 'H8' }, this)
        ],
        pawns: []
    };

    // Create black pawns with a reference to the board
    for (let i = 0; i < 8; i++) {
        this.blackPieces.pawns.push(new Pawn({ color: 'black', position: String.fromCharCode(65 + i) + '7' }, this));
    }
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
