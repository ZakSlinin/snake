const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.querySelector('#score')

let count = 0;

const audioObject = new SoundPlayer('Брбр ээ.m4a')

function playSound() {
    audioObject.play(1, 1.3)
}

const grid = 20
let snake = {
    x: 300, y: 320, dx: grid, dy: 0, cells: [], maxCells: 3
}

let apple = {
    x: 600, y: 320
}

function loop() {
    snake.x += snake.dx;
    snake.y += snake.dy;


    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x > canvas.width) {
        snake.x = 0;
    }
    if (snake.y > canvas.height) {
        snake.y = 0;
    } else if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }

    snake.cells.unshift({
        x: snake.x, y: snake.y
    })
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(apple.x, apple.y, grid, grid);
    ctx.fillStyle = '#389e11'
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid, grid);
        if (cell.x === apple.x && cell.y === apple.y) {
            playSound()
            snake.maxCells++
            count += 1;
            apple.x = Math.floor(Math.random() * 50) * grid;
            apple.y = Math.floor(Math.random() * 35) * grid;
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                restart()
                return
            }
        }
    })
    ctx.fillStyle = '#101010';

    scoreEl.textContent = `Score: ${count}`
}

function moveUp() {
    if (snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    }
}

function moveDown() {
    if (snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    }
}

function moveLeft() {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
}

function moveRight() {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft') {
        moveLeft()
    } else if (e.code === 'ArrowUp') {
        moveUp()
    } else if (e.code === 'ArrowRight') {
        moveRight()
    } else if (e.code === 'ArrowDown') {
        moveDown()
    }
})

function restart() {
    snake = {
        x: 300, y: 320, dx: grid, dy: 0, cells: [], maxCells: 3
    }

    apple = {
        x: 600, y: 320
    }

    count = 0

    clearInterval(gameLoop)
    gameLoop = setInterval(loop, 100)
}

let gameLoop = setInterval(loop, 100)