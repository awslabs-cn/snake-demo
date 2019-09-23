"use strict";

var puremvc = require('puremvc').puremvc;
var GameOverLayer = require('./../component/GameOverLayer.js').GameOverLayer;
var SceneAction = require('./../../profile/flow/SceneAction.js').SceneAction;
var ScoreProxy = require('./../../model/proxy/ScoreProxy.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'view.mediator.GameOverMediator',
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

            self.viewComponent = new GameOverLayer(0);
            self.viewComponent.winSize = cc.director.getWinSize();
            self.viewComponent.onRestart = function() {
                self._scoreProxy.resetScore();
                self.sendNotification(puremvc.statemachine.StateMachine.ACTION, null, SceneAction.$('HOME_ACTION'));
            };
            self.viewComponent.score = self._scoreProxy.getScore();

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
        NAME: 'GameOverMediator'
    }
);
