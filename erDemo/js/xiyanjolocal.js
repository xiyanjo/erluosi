var Game = (function () {
    // dom元素
    var gameDiv,
        nextDiv,
        scoreDiv,
        resultDiv;

    // 分数
    var score = 0;

    // 游戏区域矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var nextData = [
        [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];

    // 当前方块
    var cur;

    // 下一个方块
    var next;

    //原点
    var org = {
        x: 0,
        y: 4
    };

    // divs
    var nextDivs = [];
    var gameDivs = [];
    // 初始化游戏页面
    var initDiv = function (ele, data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                var newNode = document.createElement('div');
                newNode.style.left = 20 * j + 'px';
                newNode.style.top = 20 * i + 'px';
                if (data[i][j] == 0) {
                    newNode.className = 'none';
                } else if (data[i][j] == 2) {
                    newNode.className = 'current';
                } else {
                    newNode.className = 'done';
                }
                $(ele).append(newNode);
                divs.push(newNode);
            }
        }
    };
    // 初始化下一个方块
    var initNextDiv = function (ele, data, divs) {
        if (data) {
            for (var i = 0; i < data[0].length; i++) {
                for (var j = 0; j < data[0][i].length; j++) {
                    var newNode = document.createElement('div');
                    if (data[0][i][j] == 0) {
                        newNode.className = 'none';
                    } else {
                        newNode.className = 'current';
                    }
                    newNode.style.top = i * 20 + 'px';
                    newNode.style.left = j * 20 + 'px';
                    $(ele).append(newNode);
                    nextDivs.push(newNode);
                }
            }
        }

    };

    var refreshDiv = function () {
        for (var i = 0; i < nextData[1].length; i++) {
            for (j = 0; j < nextData[1][i].length; j++) {
                gameData[org.x +i][org.y+j] = nextData[1][i][j];
            }
        }
        // console.log(nextData[1],gameData);
    };

    function random() {

    }

    /**
     * 下一个方块是随机生成的
     * 1 随机生成的坐标
     * 2 随机的角度
     */
    // function getTemps(type) {
    //     var temp1 = [
    //         // [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
    //         // [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
    //         [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp2 = [
    //         // [[0, 0, 0, 0], [0, 2, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0]],
    //         // [[2, 0, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[2, 2, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         [[0, 0, 2, 0], [0, 2, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp3 = [
    //         // [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         [[0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp4 = [
    //         // [[2, 0, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 2, 2, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 0, 0, 0], [2, 2, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]],
    //         [[0, 2, 0, 0], [0, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp5 = [
    //         // [[0, 0, 0, 2], [0, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 2, 2], [0, 0, 0, 0]],
    //         // [[0, 0, 0, 0], [0, 2, 2, 2], [0, 2, 0, 0], [0, 0, 0, 0]],
    //         [[0, 2, 2, 0], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp6 = [
    //         // [[0, 0, 0, 0], [0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0]],
    //         // [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
    //         // [[0, 0, 0, 0], [0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0]],
    //         [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]]
    //     ];
    //     var temp7 = [
    //         // [[0, 0, 0, 0], [0, 2, 2, 0], [0, 0, 2, 2], [0, 0, 0, 0]],
    //         // [[0, 0, 0, 2], [0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0]],
    //         // [[0, 0, 0, 0], [0, 2, 2, 0], [0, 0, 2, 2], [0, 0, 0, 0]],
    //         [[0, 0, 0, 2], [0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0]]
    //     ];
    //     switch (type) {
    //         case 1:
    //             return temp1;
    //         case 2:
    //             return temp2;
    //         case 3:
    //             return temp3;
    //         case 4:
    //             return temp4;
    //         case 5:
    //             return temp5;
    //         case 6:
    //             return temp6;
    //         case 7:
    //             return temp7;
    //         default:
    //             break;
    //     }
    // }

    // 绑定事件
    var bindeKeyEvent = function () {
        $(document).on('keydown',function (e) {
            if(e.keyCode==38){
                Square.prototype.rotate();
            }
        })
    }
    function start() {
        // 初始化游戏区域和下一个
        // initDiv('.game', gameData, gameDivs);
        next = Square.prototype.make(0);
        initNextDiv('.next', next.data);
        refreshDiv();
        initDiv('.game', gameData, gameDivs);
        bindeKeyEvent();

    }

    return {
        start: start
    }
}()).start();