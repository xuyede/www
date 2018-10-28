//var 
let snake = new Snake

snake.head = null
snake.tail = null
snake.DIRECTIONENUM = {
    LEFT : {
        x : -1,
        y : 0
    },
    RIGHT : {
        x : 1, 
        y : 0
    },
    UP : {
        x : 0,
        y : -1
    },
    DOWN : {
        x : 0,
        y : 1
    }
}

snake.init = function (stage) {
    // 创建蛇头
    let snakeHead = SquareFactory.create('SnakeHead', 'red', 3, 1)
  
    stage.removeSquare(1, 3)
    stage.appendSquare(snakeHead)

    // 创建蛇身
    let snakeBody1 = SquareFactory.create('SnakeBody', 'blue', 2, 1),
        snakeBody2 = SquareFactory.create('SnakeBody', 'blue', 1, 1)

    stage.removeSquare(1, 2)
    stage.appendSquare(snakeBody1)
    stage.removeSquare(1, 1)
    stage.appendSquare(snakeBody2)

    // 链式存储
    snakeHead.next = snakeBody1
    snakeHead.last = null
    snakeBody1.next = snakeBody2
    snakeBody1.last = snakeHead
    snakeBody2.next = null
    snakeBody2.last = snakeBody1

    // 设置蛇头蛇尾
    this.head = snakeHead
    this.tail = snakeBody2

    // 默认运动方向
    this.direction = this.DIRECTIONENUM.RIGHT
}   

// 策略处理
snake.strateties = {
    MOVE(snake, nextSquare, stage, isFromEat = false) {
        // 创建新蛇身
        let newBody = SquareFactory.create('SnakeBody', 'blue', snake.head.x, snake.head.y)
        stage.removeSquare(snake.head.y, snake.head.x)
        stage.appendSquare(newBody)

        newBody.last = null
        newBody.next = snake.head.next
        snake.head.next.last = newBody

        // 创建新蛇头
        let newHead = SquareFactory.create('SnakeHead', 'red', nextSquare.x, nextSquare.y)
        stage.removeSquare(nextSquare.y, nextSquare.x)
        stage.appendSquare(newHead)

        newBody.last = newHead
        newHead.next = newBody

        snake.head = newHead

        // 移除最后一位(如果是吃食物的话,就不用)
        if (!isFromEat) {
            var floor = SquareFactory.create('Floor', 'orange', snake.tail.x, snake.tail.y)
            stage.removeSquare(snake.tail.y, snake.tail.x)
            stage.appendSquare(floor)

            snake.tail = snake.tail.last
        }
    },
    EAT(snake, nextSquare, stage) {
        this.MOVE(snake, nextSquare, stage, true)
        game.createFood()
    },
    OVER(snake, nextSquare, stage) {
        game.over()
    }
}

// 预判下一个方块是什么
snake.move = function (stage) {
    // this.head.x + this.direction.x   this.head.y + this.direction.y
    // row -> y / column -> x
    var nextSquare = stage.squareList[this.head.y + this.direction.y][this.head.x + this.direction.x]
    this.strateties[nextSquare.touch()](this, nextSquare, stage)
}
