function SquareFactory () {}

SquareFactory.create = function (type, color, column, row, width = SQUAREWIDTH, height = SQUAREWIDTH) {
    if (typeof SquareFactory.prototype[type] != 'function') {
        throw `没有${type}的生产线`
    }
    
    if (Object.getPrototypeOf(SquareFactory.prototype[type].prototype) != SquareFactory.prototype) {
        Object.setPrototypeOf(SquareFactory.prototype[type].prototype, new SquareFactory)
    }

    // x -> column / y -> row
    return new SquareFactory.prototype[type](color, column, row, width, height)
}

SquareFactory.prototype.init = function (square, color, message) {
    square.viewContent.style.position = 'absolute'
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px'
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px'
    square.viewContent.style.width = square.width + 'px'
    square.viewContent.style.height = square.height + 'px'
    square.viewContent.style.backgroundColor = color
    square.touch = function () {
        return message
    }
}

SquareFactory.prototype.Food = function (color, column, row, width, height) {
    let instance = new Food(width, height, column, row)
    this.init(instance, color, STRATETYENUM.eat)

    instance.update(column, row)

    return instance
}

SquareFactory.prototype.Floor = function (color, column, row, width, height) {
    let instance = new Floor(width, height, column, row)
    this.init(instance, color, STRATETYENUM.move)
    return instance
}

SquareFactory.prototype.Stone = function (color, column, row, width, height) {
    let instance = new Stone(width, height, column, row)
    this.init(instance, color, STRATETYENUM.over)
    return instance
}

SquareFactory.prototype.SnakeHead = function (color, column, row, width, height) {
    let instance = new SnakeHead(width, height, column, row)
    this.init(instance, color, STRATETYENUM.over)

    instance.update(column, row)

    return instance
}

SquareFactory.prototype.SnakeBody = function (color, column, row, width, height) {
    let instance = new SnakeBody(width, height, column, row)
    this.init(instance, color, STRATETYENUM.over)
    return instance
}

SquareFactory.prototype.Stage = function (color, column, row, width, height) {
    let instance = new Stage(width, height, column, row)
    this.init(instance, color)
    return instance
}