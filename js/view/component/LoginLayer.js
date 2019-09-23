"use strict";

var SnakeFontName = require('./../../utils/Configurations.js').SnakeFontName;
var SnakeFontSize = require('./../../utils/Configurations.js').SnakeFontSize;
var SnakeColor = require('./../../utils/Configurations.js').SnakeColor;

var LoginLayer = cc.LayerColor.extend({
    sprite: null,
    onStart: null,
    onTwoStart: null,
    onOnline: null,
    onHelp: null,

    ctor: function () {
        this._super();
        var size = cc.winSize;
        var backgroundLayer = new cc.LayerColor(SnakeColor.LOGIN_BG);
        this.addChild(backgroundLayer, 0);
        var helloLabel = new cc.LabelTTF("Snake", SnakeFontName.COMMON, SnakeFontSize.TITLE);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 120;
        this.addChild(helloLabel, 5);

        var menuItemX = size.width / 2;
        var menuItemY = size.height / 2 + 20;
        var menuItemMargin = 50;
        var singleStart = new cc.MenuItemFont("Single Player", this.handleStart, this);
        singleStart.setPosition(menuItemX, menuItemY);
        menuItemY -= menuItemMargin;
        var twoStart = new cc.MenuItemFont("Two Players", this.handleTwoStart, this);
        twoStart.setPosition(menuItemX, menuItemY);
        menuItemY -= menuItemMargin;
        var online = new cc.MenuItemFont("Online Game", this.handleOnlineStart, this);
        online.setPosition(menuItemX, menuItemY);
        menuItemY -= menuItemMargin;
        var help = new cc.MenuItemFont("Help", this.handleHelp, this);
        help.setPosition(menuItemX, menuItemY);
        var menu = new cc.Menu(singleStart, twoStart, online, help);
        menu.setPosition(0, 0);
        this.addChild(menu);

        return true;
    },
    handleStart: function() {
        if (this.onStart){
            this.onStart();
        }
    },
    handleTwoStart: function() {
        if (this.onTwoStart){
            this.onTwoStart();
        }
    },
    handleOnlineStart: function() {
        if (this.onOnline){
            this.onOnline();
        }
    },
    handleHelp: function () {
        if (this.onHelp){
            this.onHelp();
        }
    }
});

exports.LoginLayer = LoginLayer;
