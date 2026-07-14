let startX = 0
let startY = 0

function touchStart(event) {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
}

function touchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let diffX = startX - endX;
    let diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            moveLeft()
        } else {
            moveRight()
        }
    } else {
        if (diffY > 0) {
            moveUp()
        } else {
            moveDown()
        }
    }
}

document.addEventListener('touchstart', touchStart)
document.addEventListener('touchend', touchEnd)