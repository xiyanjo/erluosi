// 代表俄罗斯方块的通用逻辑，比如说左移，右移，翻转等逻辑
var Square = function() {
    // 方块的数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // 原点
    this.origin = {
        x: 0,
        y: 0
    }

    // 方向
    this.dir = 0;
};

// 旋转
Square.prototype.canRotate = function(isValid) {
    /*this.dir = 8;
    this.data = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
    this.rotates = [
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]]
    ];*/
    var d = (this.dir + 1) % 4;
    var test = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
    ];
    for (var i = 0; i < this.data.length; i++) {
        console.log('我是data中的i 4次',i);
        for (var j = 0; j < this.data[0].length; j++) {
            console.log('我是data第一个数组的的j 4次',j);
            test[i][j] = this.rotates[d][i][j];//rotates[d]确定转动的方向
        }
    }
    return isValid(this.origin, test);//转动原点 和类似方块数据传给某个函数
    // return test;//模拟
};
// console.log(Square.prototype.canRotate());

// 旋转后改变组成方块的数据
Square.prototype.rotate = function(num) {
    if (!num) num = 1;
    this.dir = (this.dir + num) % 4;
    // console.log('this.dir',this.dir);
    for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
}

// 下移
Square.prototype.canDown = function(isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
};
// 下移中心原点+1
Square.prototype.down = function() {
    this.origin.x = this.origin.x + 1;
}

// 左移
Square.prototype.canLeft = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
}
Square.prototype.left = function() {
    this.origin.y = this.origin.y - 1;
}

// 右移
Square.prototype.canRight = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
}
Square.prototype.right = function() {
    this.origin.y = this.origin.y + 1;
}