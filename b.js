const puzzle = [
    [1, 4, 6],
    [2, 5, 7],
    [3, null, 8]
];

let emptyPos = { row: 2, col: 1 }; 
let moves = 0;
const MAX_MOVES = 14; 

function renderGrid() {
    const gridElement = document.getElementById('puzzleGrid');
    gridElement.innerHTML = '';
    puzzle.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile' + (tile === null ? ' empty' : '');
            tileElement.textContent = tile || '';
            gridElement.appendChild(tileElement);
        });
    });
}

function makeMove() {
    const tileToMove = parseInt(document.getElementById('moveInput').value);
    document.getElementById('moveInput').value = ''; 

    const tilePos = findTile(tileToMove); 
    if (tilePos && canMove(tilePos)) {
        swap(tilePos); 
        moves++;
        renderGrid(); 
        document.getElementById('moveCount').textContent = "Moves: " + moves;

       
        if (isSolved()) {
            showModal('1.gif', 'Congratulations! You won the game!');
            document.getElementById('moveInput').disabled = true; 
            return; 
        }

       
        if (moves === MAX_MOVES) {
            showModal('3.gif', 'You failed.'); 
            document.getElementById('moveInput').disabled = true; 
        }
    } else {
        showModal('2.gif', 'Invalid move! Please try again.'); 
    }
}

function findTile(tile) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (puzzle[row][col] === tile) return { row, col };
        }
    }
    return null;
}

function canMove(tilePos) {
    return (Math.abs(tilePos.row - emptyPos.row) + Math.abs(tilePos.col - emptyPos.col) === 1);
}

function swap(tilePos) {
    [puzzle[emptyPos.row][emptyPos.col], puzzle[tilePos.row][tilePos.col]] =
    [puzzle[tilePos.row][tilePos.col], puzzle[emptyPos.row][emptyPos.col]];
    emptyPos = tilePos; 
}

function isSolved() {
    return JSON.stringify(puzzle) === JSON.stringify([[1, 4, 7], [2, 5, 8], [3, 6, null]]);
}

function showModal(imageSrc, message) {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalMessage = document.getElementById('modalMessage');
    modalImage.src = imageSrc; 
    modalMessage.textContent = message; 
    modal.style.display = "block"; 
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none"; 
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
};

renderGrid(); 
