"use strict";

var SnakeColor = require('./../../utils/Configurations.js').SnakeColor;
var SnakeFontSize = require('./../../utils/Configurations.js').SnakeFontSize;
var SnakeFontName = require('./../../utils/Configurations.js').SnakeFontName;

var GameOverLayer = cc.Layer.extend({
    sprite: null,
    score: 0,
    onRestart: null,

    ctor: function () {
        this._super();
        var backgroundLayer = new cc.LayerColor(SnakeColor.OVER_BG);
        this.addChild(backgroundLayer, 0);

        this.score = 0;
        return true;
    },
    onEnter: function () {
        this._super();
        var size = cc.winSize;
        var overLabel = new cc.LabelTTF("Game Over, your score is: " + this.score, SnakeFontName.COMMON, SnakeFontSize.TITLE);
        overLabel.setPosition(size.width/2, size.height/2);
        this.addChild(overLabel);

        overLabel.runAction(cc.sequence(
            cc.scaleTo(0.2, 2),
            cc.scaleTo(0.2, 0.5),
            cc.scaleTo(0.2,1)
        ));

        var restart = new cc.MenuItemFont("Restart a game", this.handleRestart, this);
        restart.setPosition(overLabel.getPositionX(), overLabel.getPositionY()-overLabel.height/2-50);
        restart.runAction(cc.repeatForever(cc.sequence(
            cc.scaleTo(0.5, 1.2),
            cc.scaleTo(0.5, 1),
        )));
        var menu = new cc.Menu(restart);
        this.addChild(menu);
        menu.setPosition(0, 0);
        return true;
    },
    handleRestart: function () {
        if (this.onRestart){
            this.onRestart();
        }
    }
});

exports.GameOverLayer = GameOverLayer;
