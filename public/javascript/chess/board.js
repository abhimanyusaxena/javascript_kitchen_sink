var Board = function(config){
    this.root_id = config.root_id;
    this.$el = document.getElementById(this.root_id);
    this.generateBoardDom();
    this.addListeners();
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

Board.prototype.boardClicked = function(event){
    // Remove 'selected' class from all pieces
    const allPieces = document.querySelectorAll('.piece');
    allPieces.forEach(piece => {
        piece.classList.remove('selected');
    });

    // Get the clicked block
    const clickedCell = event.target.closest('li');
    
    if (clickedCell) {
        // Extract row and column from data attributes
        const row = clickedCell.getAttribute('data-row');
        const col = clickedCell.getAttribute('data-col');
        
        if (row !== null && col !== null) {
            console.log(`Clicked block coordinates: row ${row}, column ${col}`);
        } else {
            console.log('Unable to determine block coordinates');
        }
    } else {
        console.log('Clicked element is not within a board square');
    }

    //Add 'selected' class to the clicked piece
    const clickedBlock = event.target;
    if (clickedBlock.classList.contains('piece')) {
        // If the clicked element is a piece, add the 'selected' class
        clickedBlock.classList.add('selected');
    } else {
        // If the clicked element is not a piece, check its parent
        const parentElement = clickedBlock.closest('.piece');
        if (parentElement) {
            parentElement.classList.add('selected');
        }
    }
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

    // Create white pawns
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

    // Create black pawns
    for (let i = 0; i < 8; i++) {
        this.blackPieces.pawns.push(new Pawn({ color: 'black', position: String.fromCharCode(65 + i) + '7' }));
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
