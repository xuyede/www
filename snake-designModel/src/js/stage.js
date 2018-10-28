// var 
let stage = SquareFactory.create('Stage', 'plum', STAGE_X_POINT, STAGE_Y_POINT, COLUMN * SQUAREWIDTH, ROW * SQUAREWIDTH)

stage.init = function () {
    // 渲染舞台
    document.body.appendChild(this.viewContent)

    // 生成/渲染地面,墙壁
    this.squareList = []
 
    for (var i = 0; i < ROW; i++) {
        this.squareList[i] = new Array(COLUMN)

        for (var j = 0; j < COLUMN; j++) {
            if ( i == 0 || i == ROW - 1 || j == 0 || j == COLUMN - 1) {
                var instance = SquareFactory.create('Stone', 'black', j, i)
            } else {
                var instance = SquareFactory.create('Floor', 'orange', j, i)
            }

            this.squareList[i][j] = instance
            this.viewContent.appendChild(instance.viewContent)
        }
    }
}

stage.removeSquare = function (x, y) {
    // x -> row / y -> column
    var square = this.squareList[x][y]

    this.viewContent.removeChild(square.viewContent)
    this.squareList[x][y] = null
}

stage.appendSquare = function (square) {
    // square.y -> row / square.x -> column
    this.viewContent.appendChild(square.viewContent)
    this.squareList[square.y][square.x] = square
}
