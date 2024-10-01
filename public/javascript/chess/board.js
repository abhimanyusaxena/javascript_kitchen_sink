let COLOR = {
    BLACK: 'black',
    WHITE: 'white'
}

let TURN = {
    BLACK: 'black',
    WHITE: 'white'
}

let GAME_STATES = {
    ENDED: 'ended',
    RUNNING: 'running'
}

var Board = function(config){
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.generateBoardDom();
    this.addListeners();
    this.turn = TURN.WHITE;
    this.gameState = GAME_STATES.RUNNING;
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
    // Get the clicked block
    const clickedCell = clickEvent.target.closest('li');
        
    if (clickedCell) {
        // Extract row and column from data attributes
        const row = clickedCell.getAttribute('data-row');
        const parentLi = clickedCell.closest('li[data-col]');
        const col = parentLi ? parentLi.getAttribute('data-col') : null;
        
        if (row !== null && col !== null) {
            return {
                row: row,
                col: col
            };
        } else {
            console.warn('Unable to determine block coordinates');
        }
    } else {
        console.warn('Clicked element is not within a board square');
    }
}

Board.prototype.clearSelection = function(){
    // Remove 'selected' class from all pieces
    const allPieces = document.querySelectorAll('.piece');
    allPieces.forEach(piece => {
        piece.classList.remove('selected');
    });
};

Board.prototype.endGame = function() {
    alert(`Player ${this.turn} has just won the game.`);
    this.gameState = GAME_STATES.ENDED;
}

Board.prototype.movePiece = function(clickedCell) {
    //update position of the selected piece to new position
    if (!this.selectedPiece) {
        return;
    }

    let victimPiece = this.getPieceAt(clickedCell);

    let firstPos = this.selectedPiece.position;
    this.selectedPiece.moveTo(clickedCell,this);
    let movedPos = this.selectedPiece.position;

    if (firstPos == movedPos) {
        return;
    }
    
    if (victimPiece) {
        victimPiece.kill(this.endGame.bind(this));
    }
    
    this.selectedPiece = null;
    this.clearSelection();
    this.switchTurns();
}

Board.prototype.switchTurns = function() {
    this.turn = this.turn == TURN.BLACK ? TURN.WHITE : TURN.BLACK;
}

Board.prototype.boardClicked = function(event){
    if (this.gameState != GAME_STATES.RUNNING) {
        return;
    }

    const clickedCell = this.getClickedBlock(event);
    const selectedPiece = this.getPieceAt(clickedCell);

    let playerTryingSelect = false;

    if (selectedPiece && selectedPiece.isColor(COLOR.BLACK) && this.turn == TURN.BLACK) {
        playerTryingSelect = true;
    }

    if (selectedPiece && selectedPiece.isColor(COLOR.WHITE) && this.turn == TURN.WHITE) {
        playerTryingSelect = true;
    }

    if (selectedPiece && !selectedPiece.isAlive()) {
        playerTryingSelect = false;
    }
    
    if (playerTryingSelect) {
        // Add 'selected' class to the clicked piece
        this.clearSelection();
        this.selectPiece(event.target, selectedPiece);
        return;
    }

    this.movePiece(clickedCell);
}

Board.prototype.getPieceAt = function(cell){
    if (!cell || !cell.row || !cell.col) {
        return false;
    }

    const position = cell.col + cell.row;

    // Check white pieces
    for (let pieceType in this.whitePieces) {
        if (Array.isArray(this.whitePieces[pieceType])) {
            // For arrays (pawns, bishops, knights, rooks)
            for (let piece of this.whitePieces[pieceType]) {
                if (piece.position === position) {
                    return piece;
                }
            }
        } else {
            // For single pieces (king, queen)
            if (this.whitePieces[pieceType].position === position) {
                return this.whitePieces[pieceType];
            }
        }
    }

    // Check black pieces
    for (let pieceType in this.blackPieces) {
        if (Array.isArray(this.blackPieces[pieceType])) {
            // For arrays (pawns, bishops, knights, rooks)
            for (let piece of this.blackPieces[pieceType]) {
                if (piece.position === position) {
                    return piece;
                }
            }
        } else {
            // For single pieces (king, queen)
            if (this.blackPieces[pieceType].position === position) {
                return this.blackPieces[pieceType];
            }
        }
    }
    return false;
}

Board.prototype.selectPiece = function(clickedElement, selectedPiece) {
    if (clickedElement.classList.contains('piece')) {
        // If the clicked element is a piece, add the 'selected' class
        clickedElement.classList.add('selected');
    } else {
        // If the clicked element is not a piece, check its parent
        const parentElement = clickedElement.closest('.piece');
        if (parentElement) {
            parentElement.classList.add('selected');
        }
    }
    selectedPiece.selected = true;
    this.selectedPiece = selectedPiece;
}

Board.prototype.initiateGame = function() {
    // Create white pieces
    this.whitePieces = {
        king: new King({ color: COLOR.WHITE, position: 'E1' }),
        queen: new Queen({ color: COLOR.WHITE, position: 'D1' }),
        bishops: [
            new Bishop({ color: COLOR.WHITE, position: 'C1' }),
            new Bishop({ color: COLOR.WHITE, position: 'F1' })
        ],
        knights: [
            new Knight({ color: COLOR.WHITE, position: 'B1' }),
            new Knight({ color: COLOR.WHITE, position: 'G1' })
        ],
        rooks: [
            new Rook({ color: COLOR.WHITE, position: 'A1' }),
            new Rook({ color: COLOR.WHITE, position: 'H1' })
        ],
        pawns: []
    };

    // Create white pawns
    for (let i = 0; i < 8; i++) {
        this.whitePieces.pawns.push(new Pawn({ color: COLOR.WHITE, position: String.fromCharCode(65 + i) + '2' }));
    }

    // Create black pieces
    this.blackPieces = {
        king: new King({ color: COLOR.BLACK, position: 'E8' }),
        queen: new Queen({ color: COLOR.BLACK, position: 'D8' }),
        bishops: [
            new Bishop({ color: COLOR.BLACK, position: 'C8' }),
            new Bishop({ color: COLOR.BLACK, position: 'F8' })
        ],
        knights: [
            new Knight({ color: COLOR.BLACK, position: 'B8' }),
            new Knight({ color: COLOR.BLACK, position: 'G8' })
        ],
        rooks: [
            new Rook({ color: COLOR.BLACK, position: 'A8' }),
            new Rook({ color: COLOR.BLACK, position: 'H8' })
        ],
        pawns: []
    };

    // Create black pawns
    for (let i = 0; i < 8; i++) {
        this.blackPieces.pawns.push(new Pawn({ color: COLOR.BLACK, position: String.fromCharCode(65 + i) + '7' }));
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
