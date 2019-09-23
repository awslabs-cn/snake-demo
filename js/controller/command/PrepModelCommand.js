"use strict";

var puremvc = require('puremvc').puremvc;
var AppConfigProxy = require('./../../model/proxy/AppConfigProxy');
var ScoreProxy = require('./../../model/proxy/ScoreProxy');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.PrepModelCommand',
        parent:puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification)
        {
            cc.log('PrepModelCommand execute');

            this.facade.registerProxy( new AppConfigProxy() );
            this.facade.registerProxy( new ScoreProxy() );
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PrepModelCommand'
    }
);
