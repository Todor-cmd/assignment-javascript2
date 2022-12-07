const rockButton = document.querySelector(`#rock`);
const paperButton = document.querySelector(`#paper`);
const scissorsButton = document.querySelector(`#scissors`);
const displayDiv = document.querySelector(`div`);
const scoreP = displayDiv.querySelector(`p`);
const instructionMsgP = document.querySelector(`#instruction`);

const actions = ["rock", "paper", "scissors"];

let playerWins = 0;
let computerWins = 0;

rockButton.addEventListener(`click`, rockChosen);
paperButton.addEventListener(`click`, paperChosen);
scissorsButton.addEventListener(`click`, scissorsChosen);

/**
 * Picks randomely the computer's choice between 'rock', 'paper' or 'scissors'.
 * @returns {string} Either 'rock', 'paper' or 'scissors'. 
 */
function computerPlay() {
    return actions[Math.floor(Math.random() * actions.length)];
}

/**
 * Plays a round of rock, paper, scissors given the choices of the player and computer.
 * @param {string} playerSelection - The player's choice, either 'rock', 'paper' or 'scissors'.
 * @param {string} copmuterSelection - The computer's choice, either 'rock', 'paper' or 'scissors'.
 */
function playRound(playerSelection, copmuterSelection) {
    //It's a tie
    if (copmuterSelection === playerSelection){
        updateResultsDisplay(`You chose ${playerSelection}, Bot chose ${copmuterSelection}. This round is a tie`);
    }

    //Computer wins
    else if (
        (copmuterSelection === `rock` && playerSelection === `scissors`) ||
        (copmuterSelection === `scissors` && playerSelection === `paper`) ||
        (copmuterSelection === `paper` && playerSelection === `rock` )
    ) {
        computerWins++;
        updateResultsDisplay(`You chose ${playerSelection}, Bot chose ${copmuterSelection}. You lose the round.`);
    }

    //User wins
    else {
        playerWins++;
        updateResultsDisplay(`You chose ${playerSelection}, Bot chose ${copmuterSelection}. You win the round.`);
    }
}

/**
 * Displays results of the latest round in the Div and can call to end the game
 * @param {string} msg - The new message to be displayed.
 */
function updateResultsDisplay(msg) {
    instructionMsgP.textContent = msg;
    scoreP.textContent = `Your score:${playerWins}, Opponent:${computerWins}`;

    if (playerWins >= 5 || computerWins >= 5) {
        endGame();
    }
}

/**
 * Ends the game of rock,paper scissors and displays winner.
 */
function endGame() {
    rockButton.removeEventListener(`click`, rockChosen);
    paperButton.removeEventListener(`click`, paperChosen);
    scissorsButton.removeEventListener(`click`, scissorsChosen);

    let winnerText;
    if (playerWins > computerWins){
        winnerText = `You win the game, well done.`;
    } else {
        winnerText = `You lose the game, computer wins.`;
    }

    let newP = document.createElement(`p`);
    newP.textContent = winnerText;

    displayDiv.appendChild(newP);
}

/**
 * Calls to play a round with the choice of rock for the player.
 */
function rockChosen() {
    playRound(`rock`, computerPlay());
}

/**
 * Calls to play a round with the choice of paper for the player.
 */
function paperChosen() {
    playRound(`paper`, computerPlay());
}

/**
 * Calls to play a round with the choice of scissors for the player.
 */
function scissorsChosen() {
    playRound(`scissors`, computerPlay());
}






