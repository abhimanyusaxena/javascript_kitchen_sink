var Board = function(config){
    this.root_id = config.root_id
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

    // Render all pieces
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
