"use strict";

var puremvc = require('puremvc').puremvc;
var GameLayer = require('./../component/GameLayer.js').GameLayer;
var SceneAction = require('./../../profile/flow/SceneAction.js').SceneAction;
var ScoreProxy = require('./../../model/proxy/ScoreProxy.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'view.mediator.GameMediator',
        parent: puremvc.Mediator,
        constructor: function() {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }

    },
    // INSTANCE MEMBERS
    {
        _scoreProxy: null,
        /** @override */
        listNotificationInterests: function () {
            return [ ];
        },

        /** @override */
        handleNotification: function (note) {

        },

        /** @override */
        onRegister: function () {
            this._scoreProxy  = this.facade.retrieveProxy(ScoreProxy.NAME);
        },

        /** @override */
        onRemove: function () {

        },
        init: function() {
            var self = this;

            self.viewComponent = new GameLayer();
            self.viewComponent.winSize = cc.director.getWinSize();
            self.viewComponent.onGameOver = function() {
                self.sendNotification(puremvc.statemachine.StateMachine.ACTION, null, SceneAction.$('GAME_OVER_ACTION'));
            };
            self.viewComponent.onScoreChange = function() {
                self.viewComponent.score.setString(self._scoreProxy.changeScore());
            };

            self.viewComponent.init();
        },
        destroy: function() {
            this.viewComponent = null;
        },
        getResource: function () {
            return null;
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'GameMediator'
    }
);
