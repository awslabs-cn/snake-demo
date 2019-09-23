# Snake Demo 贪吃蛇 Demo

## 项目描述

本项目是由 Cocos2dx-JS 结合 PureMVC 在游戏前端的模块化编程的尝试。后续会考虑加入多人游戏的模式。

## TODO 待实现功能

1. P2P 多人联机功能
2. Client - Server 多人联机功能 (Amazon GameLift)

## 编译及运行

browserify

    browserify js/app.js -o js/app-all.js
    or
    browserify js/app.js -o js/app-all.js --debug

*Windows:* http-server

    node_modules\.bin\http-server.cmd

*Linux:* http-server

    python -m SimpleHTTPServer (Apache required *)

## 参考

+ [PureMVC](http://puremvc.org/)
+ [PureMVC](http://puremvc.org/)
+ [browserify](http://browserify.org/)
+ [Cocos](https://www.cocos.com/)
+ [GeneCocosMVC](https://github.com/guyoung/GeneCocosMVC/)
