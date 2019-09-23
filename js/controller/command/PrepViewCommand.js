"use strict";

var puremvc = require('puremvc').puremvc;
var AppMediator = require('./../../view/mediator/AppMediator.js');
var DirectorMediator = require('./../../view/mediator/DirectorMediator.js');
var SceneMediator = require('./../../view/mediator/SceneMediator.js');
var LoginMediator = require('../../view/mediator/LoginMediator.js');
var GameMediator = require('../../view/mediator/GameMediator.js');
var GameOverMediator = require('../../view/mediator/GameOverMediator.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.PrepViewCommand',
        parent:puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification)
        {
            cc.log('PrepViewCommand execute');

            this.facade.registerMediator( new AppMediator() );
            this.facade.registerMediator( new DirectorMediator() );
            this.facade.registerMediator( new SceneMediator() );
            this.facade.registerMediator( new LoginMediator() );
            this.facade.registerMediator( new GameMediator() );
            this.facade.registerMediator( new GameOverMediator() );
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PrepViewCommand'
    }
);
