"use strict";

var SnakeColor = require('./../../utils/Configurations.js').SnakeColor;
var Direction = require('./../../utils/Configurations.js').Direction;
var Constants = require('./../../utils/Configurations.js').Constants;
var SnakeBody = require('./SnakeBodyLayer').SnakeBodyLayer;

var GameLayer = cc.Layer.extend({
    body: [],
    tail: null,
    star: [],
    canNewBody: 0,
    score: null,
    scoreName: null,
    onGameOver: null,
    onScoreChange: null,

    ctor: function () {
        this._super();
        var backgroundLayer = new cc.LayerColor(SnakeColor.GAME_BG);
        this.addChild(backgroundLayer, 0);

        this.body = [];
        this.tail = null;
        this.star = [];
        this.canNewBody = 0;
        this.score = null;
        this.scoreName = null;

        return true;
    },
    onEnter: function () {
        this._super();

        var head = new SnakeBody(null, Direction.RIGHT);
        head.setPosition(300, 300);
        this.addChild(head, 1);
        this.body.push(head);
        head.setTag(1);
        this.tail = head;

        for (var i = 0; i < Constants.initBodyNum; i++) {
            var node = new SnakeBody(this.tail, this.tail.direction);
            this.addChild(node, 1);
            this.body.push(node);
            this.tail = node;
        }

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.handleKeyPressed
        }, this);

        this.schedule(this.snakeMove, Constants.frequency);
        this.schedule(this.updateStar);

        var scoreName = new cc.LabelTTF("分数:", "", 30);
        scoreName.setPosition(scoreName.width / 2 + 10, cc.winSize.height - scoreName.height - 10);
        this.addChild(scoreName);

        this.score = new cc.LabelTTF("0", "", 30);
        this.score.setPosition(scoreName.getPositionX() + scoreName.width / 2 + 20, scoreName.getPositionY());
        this.addChild(this.score);
        return true;
    },
    snakeMove: function () {
        for (var index in this.body) {
            if (!this.body[index].move(this)) {
                this.unschedule(this.snakeMove);
                this.unschedule(this.updateStar);
                if (this.onGameOver){
                    this.onGameOver();
                }
            }
        }
        for (index in this.body) {
            this.body[index].direction = this.body[index].nextDirection;
        }
        if (this.canNewBody == 1) {
            var node = new SnakeBody(this.tail, this.tail.direction);
            this.addChild(node);
            this.body.push(node);
            this.tail = node;
            this.canNewBody = 0;
        }
    },
    updateStar: function () {
        var gap = Constants.beanNum - this.star.length;
        while (gap > 0) {
            var newStar = new cc.LayerColor(SnakeColor.BEAN);
            newStar.width = Constants.beanSize;
            newStar.height = Constants.beanSize;
            var randomX = Math.random() * (cc.winSize.width - newStar.width) + newStar.width;
            var randomY = Math.random() * (cc.winSize.height - newStar.height) + newStar.height;
            newStar.setPosition(randomX, randomY);

            if ((randomX > cc.winSize.width - newStar.width/2)
                || (randomX < newStar.width/2)
                || (randomY > cc.winSize.height - newStar.height/2)
                || (randomY < newStar.height/2)) {
                continue;
            }

            var flag = false;
            for (var index in this.body) {
                if (cc.rectIntersectsRect(this.body[index].getBoundingBox(), newStar.getBoundingBox())) {
                    flag = true;
                    break;
                }
            }
            if (flag) continue;

            this.star.push(newStar);
            this.addChild(newStar);
            gap -= 1;
        }
    },
    handleKeyPressed: function (keyCode, event) {
        var head = event.getCurrentTarget().getChildByTag(1);

        switch (keyCode.toString()) {
            case '87':
                if (head.nextDirection != Direction.DOWN) {
                    head.nextDirection = Direction.UP;
                }
                break;
            case '83':
                if (head.nextDirection != Direction.UP) {
                    head.nextDirection = Direction.DOWN;
                }
                break;
            case '65':
                if (head.nextDirection != Direction.RIGHT) {
                    head.nextDirection = Direction.LEFT;
                }
                break;
            case '68':
                if (head.nextDirection != Direction.LEFT) {
                    head.nextDirection = Direction.RIGHT;
                }
                break;
            case '38':
                if (head.nextDirection != Direction.DOWN) {
                    head.nextDirection = Direction.UP;
                }
                break;
            case '40':
                if (head.nextDirection != Direction.UP) {
                    head.nextDirection = Direction.DOWN;
                }
                break;
            case '37':
                if (head.nextDirection != Direction.RIGHT) {
                    head.nextDirection = Direction.LEFT;
                }
                break;
            case '39':
                if (head.nextDirection != Direction.LEFT) {
                    head.nextDirection = Direction.RIGHT;
                }
                break;
        }
    }
});

exports.GameLayer = GameLayer;
