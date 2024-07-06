const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;

const audioObject = new Audio('audio/music.mp3');


let snake = {
    x: 500,
    y: 320,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 20
}

let apple = {
    x: 100,
    y: 100
}

function loop() {
    // requestAnimationFrame(loop);

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
        x: snake.x,
        y: snake.y
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
        if(cell.x === apple.x && cell.y === apple.y) {
            audioObject.play();
            snake.maxCells ++
            count += 1;
            apple.x = Math.floor(Math.random() * 50) * grid;
            apple.y = Math.floor(Math.random() * 35) * grid;
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 500;
                snake.y = 320;
                snake.dx = grid;
                snake.dy = 0;
                snake.cells = [];
                snake.maxCells = 1;
                apple.x = Math.floor(Math.random() * 50) * grid;
                apple.y = Math.floor(Math.random() * 35) * grid;
                count = 0;
            }
        }
    })
    ctx.fillStyle = '#101010';
    ctx.font = '20px Verdana';
    ctx.fillText(`Score: ${count}`, 20, 20);
}



document.addEventListener('keydown', function (e) {
    console.log(e.code, snake.dx, snake.dy)
    if (e.code === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.code === 'ArrowUp' && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    } else if (e.code === 'ArrowRight' && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.code === 'ArrowDown' && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    }
})


setInterval(loop, 100)

// requestAnimationFrame(loop);

// звук когда еш яблоко - ok, столкновение с самим собой, очки - внутри канваса

