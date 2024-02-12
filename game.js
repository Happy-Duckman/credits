document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    let zIndexCounter = 1;

    function createRock() {
        const rock = document.createElement('div');
        rock.className = 'rock';
        rock.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
        rock.style.zIndex = zIndexCounter++;
        console.log('Created rock with zIndex:', rock.style.zIndex);

        rock.addEventListener('mousedown', function (event) {
            startDragging(event, rock);
        });

        gameContainer.appendChild(rock);
    }

    function startDragging(event, element) {
        let offsetX = event.clientX - element.getBoundingClientRect().left;
        let offsetY = event.clientY - element.getBoundingClientRect().top;

        function moveElement(event) {
            const x = event.clientX - offsetX;
            const y = event.clientY - offsetY;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }

        function stopDragging() {
            document.removeEventListener('mousemove', moveElement);
            document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDragging);
    }

    function stackRock(rock) {
        const rocksOnTop = document.querySelectorAll('.rock');
        const topRock = rocksOnTop[rocksOnTop.length - 1];

        if (!topRock || rock.offsetTop + rock.offsetHeight === topRock.offsetTop) {
            const newTop = topRock ? topRock.offsetTop - rock.offsetHeight : gameContainer.offsetHeight - rock.offsetHeight;
            rock.style.top = newTop + 'px';
        }

    }

    function resetGame() {
        gameContainer.innerHTML = '';
        zIndexCounter = 1; // Reset the zIndex counter
        // Create initial rocks
        for (let i = 0; i < 4; i++) {
            createRock();
        }
    }

    // Create initial rocks
    for (let i = 0; i < 4; i++) {
        createRock();
    }
});
