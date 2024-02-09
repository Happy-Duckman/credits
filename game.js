document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');

    function createRock() {
        const rock = document.createElement('div');
        rock.className = 'rock';
        rock.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';

        rock.addEventListener('click', function () {
            stackRock(rock);
        });

        gameContainer.appendChild(rock);
    }

    function stackRock(rock) {
        const rocksOnTop = document.querySelectorAll('.rock');
        const topRock = rocksOnTop[rocksOnTop.length - 1];

        if (!topRock || rock.offsetTop + rock.offsetHeight === topRock.offsetTop) {
            const newTop = topRock ? topRock.offsetTop - rock.offsetHeight : gameContainer.offsetHeight - rock.offsetHeight;
            rock.style.top = newTop + 'px';
        } else {
            // Game over logic, e.g., reset the game
            alert('Game Over! Rocks are not stacked.');
            resetGame();
        }
    }

    function resetGame() {
        gameContainer.innerHTML = '';
    }

    // Create initial rocks
    for (let i = 0; i < 4; i++) {
        createRock();
    }
});

