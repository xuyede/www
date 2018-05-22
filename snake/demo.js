// *贪吃蛇项目
// 1.布局  -> 固定范围，提示语
// 2.功能
//     -   1)随机生成食物，有识别颜色，蛇碰撞到后消失，再随机生成新的
//     -   2)全局定时器控制蛇头运动，上下左右键控制蛇头运动方向，蛇身体的运动算法
//     -   3)蛇对墙壁的碰撞检测，蛇对自己的碰撞检测
//     -   4)开始游戏按键，停止游戏按键，重新开始游戏按键
//     -   5)蛇与食物与运动范围成比例宽高
//     -   6)蛇吃到食物后增长自身

var contentDiv = document.getElementsByClassName('content')[0],
    food,
    snake,
    timer,
    flag = true,
    snakeBody = [],
    prop = {
        curProp: 'left',
        itarget: 0
    };
//初始化接口
function init() {
    'use strict';
    createSnake();
    createFood();
    station();
}
init();
//运动
function snakeMove() {
    'use strict';

    timer = window.setTimeout(function() {
        addEvent(document, 'keydown', function(e) {
            var event = e || window.event;
            switch (event.keyCode) {
                case 37:
                    if (prop.curProp === 'left' && prop.itarget === 300) {
                        break;
                    }
                    prop.curProp = 'left';
                    prop.itarget = 0;
                    break;
                case 38:
                    if (prop.curProp === 'top' && prop.itarget === 200) {
                        break;
                    }
                    prop.curProp = 'top';
                    prop.itarget = 0;
                    break;
                case 39:
                    if (prop.curProp === 'left' && prop.itarget === 0) {
                        break;
                    }
                    prop.curProp = 'left';
                    prop.itarget = 300;
                    break;
                case 40:
                    if (prop.curProp === 'top' && prop.itarget === 0) {
                        break;
                    }
                    prop.curProp = 'top';
                    prop.itarget = 200;
                    break;
            }
        });
        for (var i = 0; i < snakeBody.length; i++) {
            //蛇头
            if (i === 0) {
                var curVal = parseInt(getStyle(snakeBody[0], prop.curProp)),
                    speed = curVal < prop.itarget ? 10 : -10;
                //食物碰撞检测
                foodCrash(snakeBody[0], food);
                //边缘碰撞检测
                if (curVal === prop.itarget || curVal === prop.itarget - 10) {
                    //上锁，防止二次启动
                    flag = false;
                    window.clearInterval(timer);
                    return;
                }
                //自己碰撞检测
                if (selfCrash(snakeBody[0])) {
                    window.clearInterval(timer);
                    return;
                }
                //蛇头定位
                if (prop.curProp === 'left') {
                    snakeBody[0].L = parseInt(getStyle(snakeBody[0], 'left')) + speed;
                    snakeBody[0].T = parseInt(getStyle(snakeBody[0], 'top'));
                } else {
                    snakeBody[0].T = parseInt(getStyle(snakeBody[0], 'top')) + speed;
                    snakeBody[0].L = parseInt(getStyle(snakeBody[0], 'left'));
                }
            }
            //身体定位
            else {
                snakeBody[i].style.backgroundColor = '#ccc';
                snakeBody[i].L = parseInt(getStyle(snakeBody[i - 1], 'left'));
                snakeBody[i].T = parseInt(getStyle(snakeBody[i - 1], 'top'));
            }
        }
        //更新全部位置
        for (var j = 0; j < snakeBody.length; j++) {
            snakePos(snakeBody[j]);
        }
        snakeMove();
    }, 150);
}
//重新定位各部分位置
function snakePos(obj) {
    'use strict';
    //定位
    obj.style.left = obj.L + 'px';
    obj.style.top = obj.T + 'px';
}
//自身碰撞检测
function selfCrash(obj) {
    'use strict';
    var len = snakeBody.length;
    for (var i = 1; i < len; i++) {
        if (obj.L === snakeBody[i].L && obj.T === snakeBody[i].T) {
            return true;
        }
    }
}
//食物碰撞检测
function foodCrash(a, b) {
    //四个方向：
    'use strict';
    var snakeL = parseInt(getStyle(a, 'left')),
        snakeT = parseInt(getStyle(a, 'top')),
        foodL = parseInt(getStyle(b, 'left')),
        foodT = parseInt(getStyle(b, 'top'));
    //发生碰撞
    if (snakeL + 10 > foodL && snakeL < foodL + 10 &&
        snakeT + 10 > foodT && snakeT < foodT + 10) {
        contentDiv.removeChild(b);
        createFood();
        createSnake();
    }
}
//生成蛇头
function createSnake() {
    'use strict';
    var snakeStyle;
    snake = document.createElement('div');
    snakeStyle = snake.style;
    snakeStyle.width = 10 + 'px';
    snakeStyle.height = 10 + 'px';
    snakeStyle.position = 'absolute';
    snakeStyle.top = 100 + 'px';
    snakeStyle.left = 150 + 'px';
    snakeStyle.backgroundColor = '#999';
    snake.L = parseInt(snakeStyle.left);
    snake.T = parseInt(snakeStyle.top);
    snakeBody.push(snake);
    for (var i = 0; i < snakeBody.length; i++) {
        contentDiv.appendChild(snakeBody[i]);
    }
}
//键盘事件
function station() {
    'use strict';
    var now = {
        status: ''
    };
    addEvent(document, 'keydown', function(event) {
        var e = event || window.event;
        switch (e.keyCode) {
            case 90:
                now.status = 'start';
                if (flag) {
                    snakeMove();
                    flag = false;
                }
                break;
            case 88:
                now.status = 'stop';
                window.clearInterval(timer);
                flag = true;
                break;
            case 67:
                now.status = 'reStart';
                newGame();
                break;
        }
    });
}
//新游戏
function newGame() {
    'use strict';
    var len = snakeBody.length;
    flag = true;
    for (var i = 0; i < len; i++) {
        contentDiv.removeChild(snakeBody[i]);
    }
    snakeBody.splice(0, len);
    contentDiv.removeChild(food);
    window.clearInterval(timer);
    init();
}
//生成食物
function createFood() {
    'use strict';
    var foodPosX,
        foodPosY,
        foodStyle,
        mathCeil = Math.ceil,
        mathRandom = Math.random();
    food = document.createElement('div');
    foodStyle = food.style;
    foodPosX = mathCeil(mathRandom * 29);
    foodPosY = mathCeil(mathRandom * 19);
    foodStyle.width = 10 + 'px';
    foodStyle.height = 10 + 'px';
    foodStyle.backgroundColor = '#F00';
    foodStyle.position = 'absolute';
    foodStyle.left = foodPosX * 10 + 'px';
    foodStyle.top = foodPosY * 10 + 'px';
    contentDiv.appendChild(food);
}