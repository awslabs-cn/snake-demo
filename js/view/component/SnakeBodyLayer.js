"use strict";

var SnakeColor = require('./../../utils/Configurations.js').SnakeColor;
var Constants = require('./../../utils/Configurations.js').Constants;
var Direction = require('./../../utils/Configurations.js').Direction;

var SnakeBodyLayer = cc.LayerColor.extend({
    frontBody: null,
    nextDirection: 0,
    direction: 0,
    isHead: false,
    layer: null,

    ctor: function (frontBody, direction) {
        this.frontBody = frontBody;
        if (this.frontBody == null) { this.isHead = true; }
        this.direction = direction;
        this.nextDirection = direction;
        var color = this.isHead ? SnakeColor.HEAD : SnakeColor.BODY;

        this._super();
        this.width = Constants.bodySize;
        this.height = Constants.bodySize;
        var backgroundLayer = new cc.LayerColor(color, this.width, this.height);
        this.addChild(backgroundLayer);
        this.setContentSize(this.width - Constants.space, this.height - Constants.space);

        if (!this.isHead) {
            var frontX = this.frontBody.getPositionX();
            var frontY = this.frontBody.getPositionY();
            var frontWidth = this.frontBody.width;
            var frontHeight = this.frontBody.height;
            var width = this.width;
            var height = this.height;

            switch (this.frontBody.direction) {
                case Direction.UP:
                    this.setPosition(frontX, frontY-frontHeight/2-height/2-Constants.space);
                    break;
                case Direction.DOWN:
                    this.setPosition(frontX, frontY+frontHeight/2+height/2+Constants.space);
                    break;
                case Direction.LEFT:
                    this.setPosition(frontX+frontWidth/2+width/2+Constants.space, frontY);
                    break;
                case Direction.RIGHT:
                    this.setPosition(frontX-frontWidth/2-width/2-Constants.space, frontY);
                    break;
            }
        }

        return true;
    },
    /**
     * Move to next step
     * @param layer: GameLayer
     */
    move: function (layer) {
        if (!this.isHead) {
            this.nextDirection = this.frontBody.direction;
        }
        switch (this.nextDirection) {
            case Direction.UP:
                this.setPosition(this.getPositionX(), this.getPositionY()+Constants.speed);
                break;
            case Direction.DOWN:
                this.setPosition(this.getPositionX(), this.getPositionY()-Constants.speed);
                break;
            case Direction.LEFT:
                this.setPosition(this.getPositionX()-Constants.speed, this.getPositionY());
                break;
            case Direction.RIGHT:
                this.setPosition(this.getPositionX()+Constants.speed, this.getPositionY());
                break;
        }
        if (this.isHead) {
            if (!this.judgeResult(layer)) {
                return false;
            }

            this.judgeStar(layer);
        }

        return true;
    },
    /**
     * Judge if Game Over
     * @param layer: GameLayer
     */
    judgeResult: function (layer) {
        var size = cc.winSize;

        if ((this.getPositionX() > size.width - this.width/2)
            || (this.getPositionX() < this.width/2)
            || (this.getPositionY() > size.height - this.height/2)
            || (this.getPositionY() < this.height/2)) {
            cc.log("Can not move. Game Over!");
            return false;
        }
        for (var index in layer.body) {
            if (layer.body[index] != this && cc.rectIntersectsRect(this.getBoundingBox(), layer.body[index].getBoundingBox())) {
                cc.log("Touch yourself. Game Over!");
                return false;
            }
        }

        return true;
    },
    /**
     * Judge if eat stars
     * @param layer: GameLayer
     */
    judgeStar: function (layer) {
        for (var index in layer.star) {
            if (cc.rectIntersectsRect(this.getBoundingBox(), layer.star[index].getBoundingBox())) {
                layer.star[index].runAction(cc.sequence(cc.spawn(
                    cc.scaleTo(0.2, 3),
                    cc.fadeOut(0.2)
                ), cc.callFunc(function (star) {
                    star.removeFromParent();
                }, layer.star[index])));

                layer.star.splice(index, 1);
                layer.canNewBody = 1;

                if (layer.onScoreChange){
                    layer.onScoreChange();
                }
                layer.score.runAction(cc.sequence(
                    cc.scaleTo(0.1, 2),
                    cc.scaleTo(0.1, 0.5),
                    cc.scaleTo(0.1, 1)
                ));
            }
        }
    }
});

exports.SnakeBodyLayer = SnakeBodyLayer;
