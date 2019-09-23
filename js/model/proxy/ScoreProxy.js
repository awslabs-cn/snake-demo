"use strict";

var puremvc = require('puremvc').puremvc;
var SceneAction = require('./../../profile/flow/SceneAction.js').SceneAction;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'model.proxy.ScoreProxy',
        parent: puremvc.Proxy,

        constructor: function () {
            puremvc.Proxy.call(this);
        }
    },

    // INSTANCE MEMBERS
    {

        _score: 0,

        onRegister: function () {
            this._score = 0;
        },

        getScore: function () {
            return this._score;
        },

        changeScore: function () {
            var changeScore = Math.round(Math.random() * 30 + 100);
            this._score += changeScore;
            return this._score;
        },
        
        resetScore: function () {
            this._score = 0;
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'ScoreProxy'
    }
);
