





(function(){

    var board = new Board({
        root_id: "game-ct"
    });

    board.initiateGame();
    var blackKing = new King({
        color: 'black',
        position: 'A4'
    }).render();

})()