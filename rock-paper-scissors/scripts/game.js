/**
 * Picks randomely the computer's choice between 'rock', 'paper' or 'scissors'.
 * @returns {string} Either 'rock', 'paper' or 'scissors'. 
 */
function computerPlay() {
    const actions = ["rock", "paper", "scissors"];
    return actions[Math.floor(Math.random() * actions.length)];
}

/**
 * Plays a round of rock, paper, scissors given the choices of the player and computer.
 * @param {string} playerSelection - The player's choice, either 'rock', 'paper' or 'scissors'.
 * @param {string} copmuterSelection - The computer's choice, either 'rock', 'paper' or 'scissors'.
 * @returns {[string, string]} An array with the winner of game('computer, 'player' or 'tie') as  first 
 *      element and message to log the outcome as the second element. 
 */
function playRound(playerSelection, copmuterSelection) {
    //It's a tie
    if (copmuterSelection === playerSelection){
        return [`tie`, `You chose ${playerSelection}, Bot chose ${copmuterSelection}. It's a tie!`]
    }

    //Computer wins
    else if (
        (copmuterSelection === `rock` && playerSelection === `scissors`) ||
        (copmuterSelection === `scissors` && playerSelection === `paper`) ||
        (copmuterSelection === `paper` && playerSelection === `rock` )
    ) {
        return [`computer`, `You chose ${playerSelection}, Bot chose ${copmuterSelection}. You sadly lose.`]
    }

    //User wins
    else if (
        (playerSelection === `rock` && copmuterSelection === `scissors`) ||
        (playerSelection === `scissors` && copmuterSelection === "paper") ||
        (playerSelection === `paper` && copmuterSelection === `rock` )
    ) {
        return [`player`, `You chose ${playerSelection}, Bot chose ${copmuterSelection}. You win! You win!`]
    }

    //Something went wrong
    else{
        return [`tie`, `You chose ${playerSelection}, Bot chose ${copmuterSelection} and then some wizardry has
         occured. There is no winner this round.`]
    }
}

/**
 * Get the choice of the player via a prompt.
 * @returns {string} Either 'rock', 'paper' or 'scissors'.
 */
function getPlayerAction() {
    let playerSelection = prompt(`Choose between rock, paper or scissors:`).toLowerCase().replace(/\s/g, '');

    while (playerSelection !== `rock` && playerSelection !== `paper` && playerSelection !== `scissors`) {
        playerSelection = prompt(`You entered an invalid input. You can only choose between rock, paper or scissors:`)
            .toLowerCase().replace(/\s/g, '');
    }
    return playerSelection;

}

/**
 * Logs the results of the game in console.
 * @param {number} playerWins - The number of rounds the player won
 * @param {number} computerWins - The number of rounds the computer won
 */
function logResults(playerWins, computerWins) {
    console.log(`The final score is Computer: ${computerWins}, You: ${playerWins}`);
    if (computerWins > playerWins) {
        console.log(`Computer wins`)
    }
    else if(playerWins > computerWins) {
        console.log(`You win`)
    }
    else {
        console.log(`Game ends in a tie`)
    }

    if((computerWins === 0 || playerWins === 0) && computerWins != playerWins) {
        console.log(`Flawless Victory`)
    }
}

/**
 * Plays a 5-round game of rock, paper, scissors with a player and copmuter, via prompts and the console.
 */
function game() {
    let playerWins = 0;
    let computerWins = 0;

    for (let i = 1; i < 6; i++) {
        console.log(`Round ${i}`);
        let playerSelection = getPlayerAction();

        let copmuterSelection = computerPlay();
        let roundOutcome = playRound(playerSelection, copmuterSelection);

        if (roundOutcome[0] === `computer`) {
            computerWins++;
            console.log(roundOutcome[1]);
        }
        else if (roundOutcome[0] === `player`){
            playerWins++;
            console.log(roundOutcome[1]);
        }
        else {
            console.log(roundOutcome[1]);
        }
    }

    logResults(playerWins, computerWins);
}

//Start the game of rock, paper, scissors.
game();

