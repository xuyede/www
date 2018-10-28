var game = new Game

game.timer = null
game.score = 0
game.iSpeedInter = 100

game.init = function (snake, stage) {
    this.snake = snake
    this.stage = stage
    stage.init()
    snake.init(stage)
    this.createFood(snake)

    // 绑定键盘事件
    document.addEventListener('keydown', tool.throttle(this.dealEvent, 100).bind(this), false)
}

game.dealEvent = function (e) {
    var snake = this.snake
    if (e.which === 37 && snake.direction !== snake.DIRECTIONENUM.RIGHT) {
        snake.direction = snake.DIRECTIONENUM.LEFT
    } else if (e.which === 38 && snake.direction !== snake.DIRECTIONENUM.DOWN) {
        snake.direction = snake.DIRECTIONENUM.UP
    } else if (e.which === 39 && snake.direction !== snake.DIRECTIONENUM.LEFT) {
        snake.direction = snake.DIRECTIONENUM.RIGHT
    } else if (e.which === 40 && snake.direction !== snake.DIRECTIONENUM.UP) {
        snake.direction = snake.DIRECTIONENUM.DOWN
    }
}

game.start = function () {
    clearInterval(this.timer)
    this.timer = setInterval( () => {
        this.snake.move(this.stage)
    }, this.iSpeedInter)
}

game.createFood = function () {
    var x = null,
        y = null
        flag = true
        snake = this.snake

    while (flag) {
        x = 1 + parseInt(Math.random() * 28)
        y = 1 + parseInt(Math.random() * 28)

        for (var node = snake.head; node; node = node.next) {
            if (node.x !== x && node.y !== y) {
                flag = false
                break
            } else {
                continue
            }
        }
    }

    var food = SquareFactory.create('Food', 'green', x, y)
    this.stage.removeSquare(y, x)
    this.stage.appendSquare(food)
}

game.over = function () {
    clearInterval(this.timer)
    alert('over')
}

game.init(snake, stage)