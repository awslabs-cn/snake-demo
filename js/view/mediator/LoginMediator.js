"use strict";

var puremvc = require('puremvc').puremvc;
var LoginLayer = require('./../component/LoginLayer.js').LoginLayer;
var SceneAction = require('./../../profile/flow/SceneAction.js').SceneAction;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'view.mediator.LoginMediator',
        parent: puremvc.Mediator,
        constructor: function() {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }

    },
    // INSTANCE MEMBERS
    {
        _isLoadResource: true,
        /** @override */
        listNotificationInterests: function () {
            return [ ];
        },

        /** @override */
        handleNotification: function (note) {

        },

        /** @override */
        onRegister: function () {
            this._isLoadResource = false;
        },

        /** @override */
        onRemove: function () {

        },
        init: function() {
            var self = this;

            self.viewComponent = new LoginLayer();
            self.viewComponent.winSize = cc.director.getWinSize();
            self.viewComponent.onStart = function() {
                self.sendNotification(puremvc.statemachine.StateMachine.ACTION, null, SceneAction.$('GAME_ACTION'));
            };

            self.viewComponent.init();
        },
        destroy: function() {
            this.viewComponent = null;
        },
        getResource: function () {
            if (!this._isLoadResource) {
                this._isLoadResource = true;
                return require('./../ui/Resource.js').g_resources;
            }
            else
                return null;
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'LoginMediator'
    }
);
