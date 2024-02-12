document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    let zIndexCounter = 1;

    function createRock() {
        const rock = document.createElement('div');
        rock.className = 'rock';
        rock.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
        rock.style.zIndex = zIndexCounter++;

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

            applyGravity(element);
        }

        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDragging);
    }

    function applyGravity(rock) {
        const rocksBelow = getRocksBelow(rock);

        if (rocksBelow.length === 0) {
            // No rocks below, let it fall to the bottom
            const bottomPosition = gameContainer.offsetHeight - rock.offsetHeight;
            rock.style.top = `${bottomPosition}px`;
        } else {
            // There are rocks below, stack on top of the highest one
            const highestRock = rocksBelow.reduce((prev, curr) => {
                return (curr.offsetTop < prev.offsetTop) ? curr : prev;
            });

            const newTop = highestRock.offsetTop - rock.offsetHeight;
            rock.style.top = `${newTop}px`;
        }
    }

    function getRocksBelow(rock) {
        const rocks = document.querySelectorAll('.rock');
        const rocksBelow = [];

        rocks.forEach(otherRock => {
            if (otherRock !== rock && isCollision(rock, otherRock)) {
                rocksBelow.push(otherRock);
            }
        });

        return rocksBelow;
    }

    function isCollision(rock1, rock2) {
        const rect1 = rock1.getBoundingClientRect();
        const rect2 = rock2.getBoundingClientRect();
    
        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    }    

    function resetGame() {
        gameContainer.innerHTML = '';
        zIndexCounter = 1;

        for (let i = 0; i < 4; i++) {
            createRock();
        }
    }

    for (let i = 0; i < 4; i++) {
        createRock();
    }
});
