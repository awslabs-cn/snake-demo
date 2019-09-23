"use strict";

// 蛇移动的方向
var Direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

// 常量定义
var Constants = {
    frequency: 0.2,     // 刷新频率
    space: 1,           // 关节间隔
    bodySize: 30,       // 关节大小
    beanSize: 31,       // 豆子大小
    speed: 30,          // 每次移动的距离
    initBodyNum: 5,     // 初始化身体关节数量
    beanNum: 3
};

var SnakeColor = {
    BODY: cc.color(249, 205, 173),
    HEAD: cc.color(252, 157, 154),
    BEAN: cc.color(254, 67, 101),
    LOGIN_BG: cc.color(131, 175, 155, 255),
    GAME_BG: cc.color(200, 200, 169),
    OVER_BG: cc.color(131, 175, 155),
    ERROR_TIP_COLOR: cc.color(255, 0, 0),
    TIP_COLOR: cc.color(254, 67, 101),
};

var SnakeFontSize = {
    TITLE: 40,
    ERR_TIP: 40,
    TIP: 40,
    SCORE_TIP: 60,
    SCORE_LABEL: 40,
};

var SnakeFontName = {
    COMMON: "Microsoft Yahei",
};

exports.Direction = Direction;
exports.Constants = Constants;
exports.SnakeColor = SnakeColor;
exports.SnakeFontSize = SnakeFontSize;
exports.SnakeFontName = SnakeFontName;
