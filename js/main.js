const selectionButtons = document.querySelectorAll('[data-selection');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-you-score]');
const SELECTIONS = [
    {
        name: 'rock',
        emoji:'✊',
        beats:'scissor'
    },
    {
        name: 'scissor',
        emoji:'✌',
        beats:'paper'
    },
    {
        name: 'paper',
        emoji: '🖐',
        beats:'rock'
    }
]


selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e =>{
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(item => item.name === selectionName)
        makeSelection(selection);
    });
});

function makeSelection(selection){
    const computerSelection = randomSelection()
    const youWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection , selection)
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, youWinner)
    if(youWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
    clear();
    if(youWinner) document.getElementById('text').innerHTML = "You win";
    if(computerWinner) document.getElementById('text').innerHTML = "Computer win";
    if(youWinner == computerWinner) document.getElementById('text').innerHTML = "Tie";
    
};
function clear(){
    document.getElementById('text').innerHTML = "";
}
function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) +1
}

function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('select')
    if (winner)  div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length) 
    return SELECTIONS[randomIndex]
}

