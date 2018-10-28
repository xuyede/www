// 界面大小基数
let ROW = 30,
    COLUMN = 30

// 方块大小
let SQUAREWIDTH = 10

// 界面位置基数 
let STAGE_X_POINT = 5,
    STAGE_Y_POINT = 5

// 基类
function Square (width, height, x, y, viewContent) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.viewContent = viewContent || document.createElement('div')
}

Square.prototype.update = function (x, y) {
    this.x = x
    this.y = y
    this.viewContent.style.left = x * SQUAREWIDTH + 'px'
    this.viewContent.style.top = y * SQUAREWIDTH + 'px'
}

// 子类
let Food = tool.single(Square)

let Floor = tool.extend(Square)

let Stone = tool.extend(Square)

let Snake = tool.single()

let SnakeHead = tool.single(Square)

let SnakeBody = tool.extend(Square)

let Stage = tool.single(Square)

let Game = tool.single()

let STRATETYENUM = {
    move : 'MOVE',
    eat : 'EAT',
    over : 'OVER'
}


