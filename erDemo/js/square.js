/**
 * 俄罗斯方块的通用逻辑
 * 1 方块数据
 * 2 方块原点
 * 3 方块旋转后数据变化  （当前方块数据变化到gameData）
 * 4 方块的运动：下移，左移，右移，直抵、
 * 5 建立方块对象，使用原型继承：*****自身声明的为对象自身特有的，原型上添加的是公共的方法
 */

var Square = function (data) {
    this.data = data;
    this.origin = {
        x:0,
        y:0
    };
    this.dir = 0;//方向
};
Square.prototype.canRotate = function (isVaild) {
    /*var d = (this.dir+1)/4;
    for(var i = 0;i<this.data.length;i++){

    }*/
};
/**
 * 四种旋转后的类型 data[0] data[1] data[2] data[3]
 * 事件执行依次旋转角度 循环
 * @param rotes
 */


