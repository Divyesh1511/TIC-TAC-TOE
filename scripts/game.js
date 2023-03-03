function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let index = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            gameFieldElements[index].textContent = '';
            gameFieldElements[index].classList.remove('disabled');
            index++;
        }
    }

    // gameFieldElements.textContent = '';
    // gameFieldElements.classList.remove('disabled');
}

function startNewGame(){
    if(players[0].name === '' || players[1].name === ''){
        alert('Please set custom player name for both the players!');
        return;
    }

    
    resetGameStatus();
    
    
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    if(gameIsOver){
        return;
    }
    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        alert('Please select the empty field!');
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');


    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();
    
    if(winnerId !== 0){
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver(){
    //checking rows for equality
    for(let i = 0; i < 3; i++){
        if(gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]){
            return gameData[i][0];
        }
    }

    //checking colums as equality
    for(let i = 0; i < 3; i++){
        if(gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]){
            return gameData[0][i];
        }
    }

    //checking top left to right bottom
    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]){
        return gameData[0][0];
    }

    //checking bottom left to top right
    if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]){
        return gameData[2][0];
    }

    if(currentRound === 9){
        return -1;
    }

    return 0;
}

function endGame(winnerId){
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if(winnerId > 0){
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    }else{
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
    }
}