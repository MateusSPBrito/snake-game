const board = document.querySelector('#board')
let snake = { headI: 5, headJ: 7, data: [] }
let direction = 'left'
let inGame = false
let newDirectionAvailable = true


document.addEventListener("keydown", (e) => { if (newDirectionAvailable) setDirection(e) })

const setDirection = (e) => {
    if (!inGame) start()
    newDirectionAvailable = false
    if (e.key == 'ArrowLeft' && direction != 'right') direction = 'left'
    else if (e.key == 'ArrowUp' && direction != 'down') direction = 'up'
    else if (e.key == 'ArrowRight' && direction != 'left') direction = 'right'
    else if (e.key == 'ArrowDown' && direction != 'up') direction = 'down'
}

const generateData = () => {
    data = []
    for (let i = 0; i < 10; i++) {
        data.push([])
        for (let j = 0; j < 10; j++) {  
            data[i].push({})
            let casa = document.createElement('div')
            casa.setAttribute('class', 'casa')
            casa.setAttribute('id', `i${i}j${j}`)
            board.appendChild(casa)
        }
    }
    setSnake()
}

const setSnake = () => {
    board.querySelector(`#i${snake.headI}j${snake.headJ}`).classList.add('head')
    for (let i = 0; i < 2; i++) {
        board.querySelector(`#i${snake.headI}j${snake.headJ + i + 1}`).classList.add('snake')
        snake.data.push({ i: snake.headI, j: snake.headJ + i + 1 })
    }
    newFood()
}

const start = () => {
    inGame = true
}

const end = () => {
    console.log('end');
    inGame = false
}

const moveHead = () => {
    const position = { i: snake.headI, j: snake.headJ }
    board.querySelector(`#i${snake.headI}j${snake.headJ}`).classList.remove('head')
    let addSize = false
    let isDefeat = false
    if (direction == 'left') {
        isDefeat = defeat({ i: snake.headI, j: snake.headJ - 1 })
        if (!isDefeat) {
            addSize = eatFood({ i: snake.headI, j: snake.headJ - 1 })
            snake.headJ--
        }
    }
    else if (direction == 'right') {
        isDefeat = defeat({ i: snake.headI, j: snake.headJ + 1 })
        if (!isDefeat) {
            addSize = eatFood({ i: snake.headI, j: snake.headJ + 1 })
            snake.headJ++
        }
    }
    else if (direction == 'up') {
        isDefeat = defeat({ i: snake.headI - 1, j: snake.headJ })
        if (!isDefeat) {
            addSize = eatFood({ i: snake.headI - 1, j: snake.headJ })
            snake.headI--
        }
    }
    else if (direction == 'down') {
        isDefeat = defeat({ i: snake.headI + 1, j: snake.headJ })
        if (!isDefeat) {
            addSize = eatFood({ i: snake.headI + 1, j: snake.headJ })
            snake.headI++
        }
    }
    board.querySelector(`#i${snake.headI}j${snake.headJ}`).classList.add('head')
    if (isDefeat) end()
    else moveSnake(position, 0, addSize)
    newDirectionAvailable = true
}

const moveSnake = (position, index, addsize) => {
    if (index == snake.data.length) {
        if (addsize == true) {
            snake.data.push(position)
            newFood()
        }
        return
    }
    const newPosition = { i: snake.data[index].i, j: snake.data[index].j }
    if (!(index + 1 == snake.data.length && addsize == true)) board.querySelector(`#i${snake.data[index].i}j${snake.data[index].j}`).classList.remove('snake')
    board.querySelector(`#i${position.i}j${position.j}`).classList.add('snake')
    snake.data[index] = { i: position.i, j: position.j }
    moveSnake(newPosition, index + 1, addsize)
}

const eatFood = (position) => {
    const element = board.querySelector(`#i${position.i}j${position.j}`)
    if (!element.classList.contains('food')) return false
    element.classList.remove('food')
    return true
}

const newFood = () => {
    const i = Math.floor(Math.random() * 10)
    const j = Math.floor(Math.random() * 10)
    const casa = board.querySelector(`#i${i}j${j}`)
    if (casa.classList.contains('snake') || casa.classList.contains('head')) newFood()
    else casa.classList.add('food')
    return
}

const defeat = (position) => {
    if (position.i < 0 || position.i > 9 || position.j < 0 || position.j > 9) return true
    const element = board.querySelector(`#i${position.i}j${position.j}`)
    if (element.classList.contains('snake')) return true
    return false
}

const gameInterval = () => {
    setInterval(() => {
        if (inGame) moveHead()
    }, 100);
}
gameInterval()
generateData()